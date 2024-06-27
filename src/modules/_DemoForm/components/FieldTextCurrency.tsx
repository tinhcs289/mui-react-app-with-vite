import { RHFTextCurrency } from "@/components/form/input/TextCurrency";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldTextCurrency() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFTextCurrency
      control={control}
      name="textcurrencyfield"
      label="Nhập liệu số tiền"
      suffix=" VNĐ"
      placeholder="Hãy nhập số tiền"
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
