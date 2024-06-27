import { RHFDatePicker } from "@/components/form/input-date-time/DatePicker";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldDatePicker() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFDatePicker
      control={control}
      name="datefield"
      label="Chọn ngày"
      placeholder="Hãy chọn ngày"
      rules={required(t("common:pleaseSelect"))}
    />
  );
}
