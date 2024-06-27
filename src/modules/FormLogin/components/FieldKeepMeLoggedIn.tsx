import { RHFSwitchWithLabel } from "@/components/form/input-boolean/SwitchWithLabel";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context";

export default function FieldKeepMeLoggedIn() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <RHFSwitchWithLabel
      control={control}
      name="rememberMe"
      label={t("login:rememberMe")}
    />
  );
}
