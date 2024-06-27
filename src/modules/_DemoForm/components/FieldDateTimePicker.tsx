import { RHFDateTimePicker } from "@/components/form/input-date-time/DateTimePicker";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldDateTimePicker() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFDateTimePicker
      control={control}
      name="datetimefield"
      label="Chọn ngày/giờ"
      placeholder="Hãy chọn ngày/giờ"
      rules={required(t("common:pleaseSelect"))}
    />
  );
}
