import { RHFText } from "@/components/form/input/Text";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldText() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFText
      control={control}
      name="textfield"
      label="Nhập liệu văn bản"
      // placeholder="Hãy nhập văn bản"
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
