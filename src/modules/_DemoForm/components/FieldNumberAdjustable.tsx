import { RHFNumberAdjustable } from "@/components/form/input/NumberAdjustable";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldNumberAdjustable() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFNumberAdjustable
      control={control}
      name="numberadjustable"
      label="Điều chỉnh số lượng"
      placeholder="Nhập/điều chỉnh số lượng"
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
