import { RHFText } from "@/components/form/input/Text";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldUserName() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFText
      control={control}
      name="username"
      label={t("register:account")}
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
