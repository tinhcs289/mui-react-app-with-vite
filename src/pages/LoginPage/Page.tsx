import BoxAvatar from "@/components/box/BoxAvatar";
import ButtonLink from "@/components/buttons/ButtonLink";
import { H4 } from "@/components/typo/HTags";
import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import type { AnyObject } from "@/types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const FormLogin = lazy(() => wait().then(() => import("@/modules/FormLogin")));

export type PageProps = AnyObject;

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <BoxAvatar
        Icon={LockOutlinedIcon}
        sx={{ m: 1, bgcolor: "secondary.main" }}
      />
      <H4 maxLines={1}>{t("login:login")}</H4>
      <FormLogin sx={{ mt: "32px" }} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <ButtonLink to={PATHS.forgetPassword}>
            {t("login:forgotPassword")}
          </ButtonLink>
        </Grid>
        <Grid item>
          <ButtonLink to={PATHS.register}>
            {t("login:dontHaveAccount_register")}
          </ButtonLink>
        </Grid>
      </Grid>
    </>
  );
}
