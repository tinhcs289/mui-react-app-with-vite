import { RHFCheckWithLabel } from "@/components/form/input-boolean/CheckWithLabel";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldAcceptWithTernAndCondition() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFCheckWithLabel
      control={control}
      name="acceptWithTermAndCondition"
      label={t("register:iAcceptWithTermAndCondition")}
    />
  );
}
