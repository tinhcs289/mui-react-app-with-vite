import ButtonSubmit from "@/components/buttons/ButtonSubmit";
import { useTranslation } from "react-i18next";

export default function ButtonLogin() {
  const { t } = useTranslation();
  return (
    <ButtonSubmit id="login-form:button:submit" fullWidth>
      {t("login:login")}
    </ButtonSubmit>
  );
}
