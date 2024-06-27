import type {
  CommonFormContextValues,
  CommonFormProps,
  CommonFormStates,
} from "@/types";
import type { GridProps } from "@mui/material/Grid";

export type FormValues = {
  username?: string | null;
  password?: string | null;
  rememberMe?: boolean | null;
};

export type FormContextValues = CommonFormContextValues<FormValues>;

export type FormStates = CommonFormStates;

export type FormProps = CommonFormProps<FormValues, Partial<GridProps<"form">>>;
