import BoxTooltip from "@/components/box/BoxTooltip";
import ButtonPositive from "@/components/buttons/ButtonPositive";
import PATHS from "@/constants/paths";
import { ASIDE_BOTTOM_HEIGHT } from "@/layouts/MainLayout/constants";
import { useGetStateMainLayout } from "@/layouts/MainLayout/context";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ButtonLogout() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAsideOpen = useGetStateMainLayout((s) => !!s?.isAsideOpen);

  const handleClickLogout: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation?.();
    event?.preventDefault?.();
    navigate(PATHS.logout);
  };

  return (
    <Grid
      item
      xs={12}
      px={isAsideOpen ? 4 : 1}
      py={isAsideOpen ? 2 : 0}
      container
      alignItems="center"
      justifyContent="center"
    >
      {isAsideOpen ? (
        <ButtonPositive
          fullWidth
          startIcon={<ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />}
          onClick={handleClickLogout}
        >
          {t("login:logout")}
        </ButtonPositive>
      ) : (
        <BoxTooltip tooltipProps={{ title: t("login:logout") }}>
          <IconButton color="inherit" onClick={handleClickLogout}>
            <ExitToAppIcon
              sx={{
                transform: "rotate(180deg)",
                color: (theme) => theme.palette.primary.contrastText,
              }}
            />
          </IconButton>
        </BoxTooltip>
      )}
    </Grid>
  );
}

export default function AsideBottom() {
  return (
    <Grid
      container
      width="100%"
      alignItems="center"
      justifyContent="center"
      sx={{ height: ASIDE_BOTTOM_HEIGHT }}
    >
      <ButtonLogout />
    </Grid>
  );
}
