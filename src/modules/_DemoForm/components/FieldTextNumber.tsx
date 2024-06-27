import { RHFTextNumber } from "@/components/form/input/TextNumber";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldTextNumber() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFTextNumber
      control={control}
      name="textnumberfield"
      label="Nhập liệu số"
      placeholder="Hãy nhập số"
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
