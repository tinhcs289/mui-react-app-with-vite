import { RHFText } from "@/components/form/input/Text";
import { required } from "@/helpers/react-hook-form-helpers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useToggle } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldPasswordReEntered() {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const [isShowPassword, toggleShowPassword] = useToggle(false);

  const type = useMemo(
    () => (isShowPassword ? "text" : "password"),
    [isShowPassword]
  );

  const $EndAdornment = useMemo(
    () => (
      <IconButton
        size="small"
        onClick={(e) => {
          e?.stopPropagation?.();
          toggleShowPassword();
        }}
      >
        {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    ),
    [isShowPassword, toggleShowPassword]
  );

  const password = useWatch({ name: "password", control }) as string;

  return (
    <RHFText
      control={control}
      name="passwordReEntered"
      label={t("register:passwordReEnter")}
      rules={{
        ...required(t("common:pleaseEnter")),
        validate: {
          PasswordAndPasswordReEnterdMustMatch: (reEnteredPassword: string) =>
            reEnteredPassword === password || t("register:passwordDoesntMatch"),
        },
      }}
      type={type}
      InputProps={{
        endAdornment: $EndAdornment,
      }}
    />
  );
}
