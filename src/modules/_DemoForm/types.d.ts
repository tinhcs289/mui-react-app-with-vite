import type {
  CommonFormContextValues,
  CommonFormProps,
  CommonFormStates,
  Option,
} from "@/types";
import type { GridProps } from "@mui/material/Grid";
import type { Moment } from "moment";

export type FormValues = {
  textfield?: string | null;
  textareafield?: string | null;
  textnumberfield?: number | null;
  textpercentfield?: number | null;
  textcurrencyfield?: number | null;
  textnumberadjustable?: number | null;
  numberadjustable?: number | null;
  singleSelectfield?: Option | null;
  multipleSelectfield?: Option[] | null;
  checkfield?: boolean | null;
  radiofield?: boolean | null;
  swithfield?: boolean | null;
  checkgroupfield?: Option[] | null;
  switchgroupfield?: Option[] | null;
  radiogroupfield?: Option | null;
  datefield?: Moment | null;
  datetimefield?: Moment | null;
  timefield?: Moment | null;
};

export type FormContextValues = CommonFormContextValues<FormValues>;

export type FormStates = CommonFormStates;

export type FormProps = CommonFormProps<FormValues, Partial<GridProps<"form">>>;
