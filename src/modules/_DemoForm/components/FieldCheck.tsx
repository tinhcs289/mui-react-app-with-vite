import { RHFCheckWithLabel } from "@/components/form/input-boolean/CheckWithLabel";
import { required } from "@/helpers/react-hook-form-helpers";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldCheck() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFCheckWithLabel
      control={control}
      name="checkfield"
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      rules={required(t("common:pleaseSelect"))}
    />
  );
}
