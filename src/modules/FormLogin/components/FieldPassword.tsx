import { RHFText } from "@/components/form/input/Text";
import { required } from "@/helpers/react-hook-form-helpers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useToggle } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldPassword() {
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
          e?.preventDefault?.();
          toggleShowPassword();
        }}
      >
        {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    ),
    [isShowPassword, toggleShowPassword]
  );

  return (
    <RHFText
      control={control}
      name="password"
      label={t("login:password")}
      rules={required(t("common:pleaseEnter"))}
      type={type}
      InputProps={{
        endAdornment: $EndAdornment,
      }}
    />
  );
}
