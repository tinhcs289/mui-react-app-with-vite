import BoxAvatar from "@/components/box/BoxAvatar";
import ButtonLink from "@/components/buttons/ButtonLink";
import { H4 } from "@/components/typo/HTags";
import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Grid from "@mui/material/Grid";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const FormRegister = lazy(() =>
  wait().then(() => import("@/modules/FormRegister"))
);

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <BoxAvatar
        Icon={AppRegistrationIcon}
        sx={{ m: 1, bgcolor: "secondary.main" }}
      />
      <H4 maxLines={1}>{t("register:register")}</H4>
      <FormRegister sx={{ mt: "32px" }} />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <ButtonLink to={PATHS.login}>
            {t("register:alreadyHaveAccount_login")}
          </ButtonLink>
        </Grid>
      </Grid>
    </>
  );
}
