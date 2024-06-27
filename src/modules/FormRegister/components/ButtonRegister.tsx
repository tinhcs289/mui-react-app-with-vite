import ButtonSubmit from "@/components/buttons/ButtonSubmit";
import { useTranslation } from "react-i18next";

export default function ButtonRegister() {
  const { t } = useTranslation();
  return (
    <ButtonSubmit id="register-form:button:submit" fullWidth>
      {t("register:register")}
    </ButtonSubmit>
  );
}
