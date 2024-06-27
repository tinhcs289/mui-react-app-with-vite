import { RHFText } from "@/components/form/input/Text";
import { email, required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldEmail() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFText
      control={control}
      name="email"
      label={t("register:email")}
      rules={{
        ...required(t("common:pleaseEnter")),
        ...email(t("common:invalidEmail")),
      }}
    />
  );
}
