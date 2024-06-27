import type {
  CommonFormContextValues,
  CommonFormProps,
  CommonFormStates,
} from "@/types";
import type { GridProps } from "@mui/material/Grid";

export type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  passwordReEntered?: string;
  acceptWithTermAndCondition?: boolean;
};

export type FormContextValues = CommonFormContextValues<FormValues>;

export type FormStates = CommonFormStates;

export type FormProps = CommonFormProps<FormValues, Partial<GridProps<"form">>>;
