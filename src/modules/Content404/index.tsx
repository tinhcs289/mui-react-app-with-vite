import authentication from "@/browser/cookies/authentication";
import BoxImage from "@/components/box/BoxImage";
import ButtonPositive from "@/components/buttons/ButtonPositive";
import { H4 } from "@/components/typo/HTags";
import TypographyCommon from "@/components/typo/TypographyCommon";
import { IMAGES } from "@/constants/images";
import PATHS from "@/constants/paths";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Content404() {
  const { t } = useTranslation();
  const accessToken = authentication.get()?.accessToken;
  return (
    <Grid container p="16px">
      <Grid item xs={12} container my="24px" justifyContent="center">
        <H4>{`404`}</H4>
      </Grid>
      <Grid item xs={12} container mb="16px" justifyContent="center">
        <TypographyCommon color="GrayText">
          {t("notFound:theContentDoesnotExist")}
        </TypographyCommon>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {!accessToken ? (
          <ButtonPositive
            LinkComponent={NavLink}
            {...{ to: PATHS.login }}
            startIcon={<LoginIcon />}
            variant="contained"
          >
            {t("notFound:backToSignin")}
          </ButtonPositive>
        ) : (
          <ButtonPositive
            LinkComponent={NavLink}
            {...{ to: PATHS.main }}
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            {t("notFound:backToDashboard")}
          </ButtonPositive>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        pt="80px"
        sx={{ "& svg": { maxHeight: "400px", maxWidth: "100%" } }}
      >
        <BoxImage imageProps={{ src: IMAGES.notFoundModules }} height={400} />
      </Grid>
    </Grid>
  );
}
