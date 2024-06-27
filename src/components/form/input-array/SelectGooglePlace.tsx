import { HttpRequestStatus } from "@/constants/http-request-status";
import concatArray from "@/helpers/array-helpers/concatArray";
import tryDo from "@/helpers/async-helpers/tryDo";
import isValidAsYupSchema from "@/helpers/common-helpers/isValidAsYupSchema";
import { GMap } from "@/helpers/gmap-helpers";
import withHOCs from "@/helpers/react-helpers/withHocs";
import type {
  ApiRequestStatus,
  Option,
  RHFInputProps,
  RHFRenderInput,
} from "@/types";
import type { AxiosResponse } from "axios";
import type { ComponentType } from "react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import type { SelectProps } from "./Select";
import Select from "./Select";

export type PlaceData = {
  placeId?: string;
  placeName?: string;
  placeData?: google.maps.places.AutocompletePrediction;
  placeGeocode?: google.maps.GeocoderResult;
  lat?: number;
  lng?: number;
};

export type GooglePlaceOption = Option<PlaceData>;

export type PlaceQueryFailReason = "not_found" | "api_error" | "invalid_params";

type RequestError = {
  response?: AxiosResponse<any>;
  reason?: PlaceQueryFailReason;
  [x: string]: any;
};

export type SelectGooglePlaceProps = SelectProps<PlaceData> & {
  onQueryFail?: (text: string, reason?: PlaceQueryFailReason) => void;
};

function isValidPlace(place?: GooglePlaceOption) {
  if (!place) return false;
  return isValidAsYupSchema(
    place,
    yup.object().shape({
      value: yup.string().required(),
      label: yup.string().required(),
      placeId: yup.string().required(),
      placeName: yup.string().required(),
    }) as any
  );
}

function toOption(
  option: google.maps.places.AutocompletePrediction
): GooglePlaceOption {
  return {
    value: option.place_id,
    label: option.description,
    placeId: option.place_id,
    placeName: option.description,
    placeData: option,
  } as GooglePlaceOption;
}

function withAutoAppendValueToOptions(
  WrappedComponent: ComponentType<SelectGooglePlaceProps>
) {
  const NewComponent = forwardRef<unknown, SelectGooglePlaceProps>(
    ({ multiple, value, options, ...otherProps }, ref) => {
      const memoOptions = useMemo(() => {
        if (!value) return options;
        if (value instanceof Array && value.length === 0) return options;

        if (!multiple) {
          if (!isValidPlace(value as GooglePlaceOption)) return options || [];
          if (!options) return [value];
          if (
            options.findIndex(
              (o) => o.value === (value as GooglePlaceOption).value
            ) >= 0
          )
            return options;

          return [...options, value] as GooglePlaceOption[];
        }

        if (!(value instanceof Array && value.length > 0)) return options;
        if (!options) return value;
        if (options instanceof Array && options.length === 0) return value;

        const needToAppend = (value as GooglePlaceOption[]).filter((v) => {
          return !options.some((o) => o.value === v.value);
        });
        if (needToAppend.length === 0) return options;

        return concatArray(options, needToAppend);
      }, [options, value, multiple]);

      return (
        <WrappedComponent
          {...otherProps}
          options={memoOptions}
          multiple={multiple}
          value={value}
          ref={ref}
        />
      );
    }
  );
  NewComponent.displayName = "WithAutoAppendValueToOptions";
  return NewComponent as ComponentType<SelectGooglePlaceProps>;
}

function withGooglePlaceSearchApi(
  WrappedComponent: ComponentType<SelectGooglePlaceProps>
) {
  const NewComponent = forwardRef<unknown, SelectGooglePlaceProps>(
    (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { loading: _, options: __, onChange, onQueryFail, ...otherProps },
      ref
    ) => {
      const [preText, setPreText] = useState<string | null>(null);
      const [options, setOptions] = useState<GooglePlaceOption[]>([]);
      const [requestStatus, setRequestStatus] = useState<ApiRequestStatus>(
        HttpRequestStatus.NONE
      );

      const clearData = () => {
        setPreText(null);
        setOptions([]);
        setRequestStatus(HttpRequestStatus.NONE);
      };

      const handleCallRequest = async (text: string) => {
        setPreText(text);
        setRequestStatus(HttpRequestStatus.REQUESTING);
        try {
          const result = await GMap.searchPlaces(text);
          const error: RequestError = {};
          if (result.length === 0) {
            error.reason = "not_found";
            throw error;
          }
          if (typeof toOption !== "function") {
            error.reason = "invalid_params";
            throw error;
          }
          const resultWithGeocode = await Promise.all(
            result.map((r) =>
              (async () => {
                const place: GooglePlaceOption = toOption(r);
                if (!place?.placeId) return place;
                const [_error, geocode] = await tryDo(
                  GMap.getPlace(place.placeId)
                );
                if (!!_error || !geocode) return place;
                place.placeGeocode = geocode;
                place.lng = geocode.geometry.location.lng();
                place.lat = geocode.geometry.location.lat();
                return place;
              })()
            )
          );
          setOptions(resultWithGeocode);
          setRequestStatus(HttpRequestStatus.REQUESTSUCCESS);
        } catch (error: RequestError | any) {
          setOptions([]);
          setRequestStatus(HttpRequestStatus.REQUESTFAIL);
          onQueryFail?.(text, error?.["reason"] as PlaceQueryFailReason);
        } finally {
          setRequestStatus(HttpRequestStatus.NONE);
        }
      };

      const handleQuery: Required<SelectProps<PlaceData>>["onInputChange"] = (
        _,
        text,
        reason
      ) => {
        const searchText = !!text ? text?.trim?.() : "";
        if (reason === "clear" || !searchText) clearData();
        if (reason === "reset" || searchText.length < 3) return;
        if (searchText !== preText) handleCallRequest(searchText);
        return;
      };

      const handleChange: Required<SelectProps<PlaceData>>["onChange"] = (
        event,
        value,
        reason,
        detail
      ) => {
        if (reason === "clear") clearData();
        onChange?.(event, value, reason, detail);
      };

      const loading = useMemo(
        () => requestStatus === HttpRequestStatus.REQUESTING,
        [requestStatus]
      );

      useEffect(() => {
        const loadLibOnMount = async () => {
          await GMap.loadPlaceService();
        };

        loadLibOnMount();
      }, []);

      return (
        <WrappedComponent
          {...otherProps}
          options={options}
          loading={loading}
          onInputChange={handleQuery}
          onChange={handleChange as any}
          ref={ref}
        />
      );
    }
  );
  NewComponent.displayName = "WithGooglePlaceSearchApi";
  return NewComponent as ComponentType<SelectGooglePlaceProps>;
}

const SelectGooglePlace = withHOCs(
  withGooglePlaceSearchApi,
  withAutoAppendValueToOptions
)(Select as ComponentType<SelectGooglePlaceProps>);

export default SelectGooglePlace;

export type RHFSelectGooglePlaceProps = Omit<
  SelectGooglePlaceProps,
  "name" | "name" | "onChange"
> &
  RHFInputProps;

export function RHFSelectGooglePlace(props: RHFSelectGooglePlaceProps) {
  const {
    name,
    multiple,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    options = [],
    TextFieldProps,
    ...otherProps
  } = props;
  const renderInput: RHFRenderInput = useCallback(
    ({
      field: { onChange, onBlur, value, ref },
      fieldState: { invalid, error },
    }) => {
      return (
        <SelectGooglePlace
          {...otherProps}
          multiple={multiple}
          value={value}
          options={options}
          defaultValue={defaultValue || value || undefined}
          onChange={(_, val) => {
            onChange(val);
          }}
          TextFieldProps={{ ...TextFieldProps, inputRef: ref, name, onBlur }}
          required={!!rules?.required}
          errorText={error?.message ?? undefined}
          error={!!invalid}
        />
      );
    },
    [
      rules?.required,
      defaultValue,
      TextFieldProps,
      multiple,
      name,
      options,
      otherProps,
    ]
  );
  return (
    <Controller
      render={renderInput}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
    />
  );
}
