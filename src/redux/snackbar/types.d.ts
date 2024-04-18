import { SNACKBAR_VARIANT } from "@/constants/snackbar";

export type States = {
  id: string | null;
  message: string | null;
  variant: `${SNACKBAR_VARIANT}`;
};
