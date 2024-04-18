import type { AnyObject } from "@/types/AnyObject";
import type { ApiRequestStatus } from "@/types/ApiRequestStatus";
import type { Moment } from "moment";
import type { RefObject } from "react";
import { useFormContext } from "react-hook-form";

export type FileData<FileInfo extends AnyObject = AnyObject> = FileInfo & {
  id: string | number;
  source?: string;
  file?: File;
  base64?: string;
  uploadStatus?: ApiRequestStatus;
};

export type DateRange = {
  From?: Moment | null;
  To?: Moment | null;
};
export type DayOfWeek = "MON" | "TUE" | "WEB" | "THU" | "PRI" | "SAT" | "SUN";

export type Option<T extends AnyObject = AnyObject> = T & {
  label: string;
  value: string;
  disabled?: boolean;
  childrens?: Option<T>[];
};

export type Tag<T extends AnyObject = AnyObject> = T & {
  value: string;
  label: string;
  disabled?: boolean;
};

/**
 * - `creation`: form for creating new data
 * - `editable`: form for editing data
 * - `readonly`: form for editing data, but all inputs are disabled.
 * - `viewonly`: form for view data, it can be a difference display.
 * - `search-filter`: form for advance filter of a list view.
 */
export type CommonFormType =
  | "creation"
  | "editable"
  | "readonly"
  | "viewonly"
  | "search-filter";

export type CommonFormCloseReason =
  | "after_submit_successful"
  | "click_outside"
  | "force_close";

export type CommonFormOnCloseParams<
  CallbackDataOnClose extends AnyObject = AnyObject
> = {
  reason?: CommonFormCloseReason;
  feedback?: CallbackDataOnClose;
};
export type CommonFormOnClose<
  CallbackDataOnClose extends AnyObject = AnyObject
> = (params: CommonFormOnCloseParams<CallbackDataOnClose>) => void;

export type CommomFormOnSubmit<FormValues extends AnyObject = AnyObject> = (
  values: FormValues,
  /**
   * reason for custom submit event: eg: "save_draft", "save_then_publish", ....
   * @default 'main_action'
   */
  reason?: string
) => void;

export type CommonFormProps<
  FormValues extends AnyObject = AnyObject,
  ExtendProps extends AnyObject = AnyObject,
  CallbackDataOnClose extends AnyObject = AnyObject
> = {
  /**
   * @default 'editable'
   */
  formType?: CommonFormType;
  /**
   * field name in nested-form structure.
   * used in the case of this form corresponds to an object field of another form.
   */
  namePrefix?: string;
  /**
   * controlled values
   */
  values?: Partial<FormValues>;
  /**
   * initialized values
   */
  defaultValues?: Partial<FormValues>;
  onSubmit?: CommomFormOnSubmit<FormValues>;
  loading?: boolean;
  /**
   * being used when display form as a Dialog
   */
  onClose?: CommonFormOnClose<CallbackDataOnClose>;
  open?: boolean;
} & ExtendProps;

export type CommonFormComponent<
  FormValues extends AnyObject = AnyObject,
  ExtendProps extends AnyObject = AnyObject,
  CallbackDataOnClose extends AnyObject = AnyObject
> = ComponentType<
  CommonFormProps<FormValues, ExtendProps, CallbackDataOnClose>
>;

export type CommonFormHOC<
  FormValues extends AnyObject = AnyObject,
  ExtendProps extends AnyObject = AnyObject,
  CallbackDataOnClose extends AnyObject = AnyObject
> = (
  WrappedComponent: CommonFormComponent<
    FormValues,
    ExtendProps,
    CallbackDataOnClose
  >
) => CommonFormComponent<FormValues, ExtendProps, CallbackDataOnClose>;

export type CommonFormContextValues<FormValues extends AnyObject = AnyObject> =
  ReturnType<typeof useFormContext<FormValues>> & {
    formRef?: RefObject<HTMLFormElement>;
    dispatchSubmit?: () => void;
    submitReasonRef?: RefObject<string | null | undefined>;
  };

export type CommonFormStates<
  ExtendStates extends AnyObject = AnyObject,
  CallbackDataOnClose extends AnyObject = AnyObject
> = {
  /**
   * @default 'editable'
   */
  formType?: CommonFormType;
  loading?: boolean;
  submitting?: boolean;
  /**
   * being used when display form as a Dialog
   */
  onClose?: CommonFormOnClose<CallbackDataOnClose>;
} & ExtendStates;
