import { RHFTimePicker } from "@/components/form/input-date-time/TimePicker";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldTimePicker() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFTimePicker
      control={control}
      name="timefield"
      label="Chọn giờ"
      placeholder="Hãy chọn giờ"
      rules={required(t("common:pleaseSelect"))}
    />
  );
}
