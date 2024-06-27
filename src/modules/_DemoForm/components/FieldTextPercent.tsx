import { RHFTextPercent } from "@/components/form/input/TextPercent";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldTextPercent() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFTextPercent
      control={control}
      name="textpercentfield"
      label="Nhập liệu số %"
      placeholder="Hãy nhập số %"
      rules={required(t("common:pleaseEnter"))}
    />
  );
}
