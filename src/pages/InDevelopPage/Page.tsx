import ButtonPositive from "@/components/buttons/ButtonPositive";
import PATHS from "@/constants/paths";
import wait from "@/helpers/async-helpers/wait";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { lazy } from "react";
import { NavLink } from "react-router-dom";

const DevelopBackground = lazy(() =>
  wait().then(() => import("@/components/svg/DevelopBackground"))
);

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

export default function Page() {
  return (
    <PageContainer>
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12} container justifyContent="center" my="24px">
          <Typography variant="h4">{`Chức năng đang trong quá trình phát triển`}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center" mb="16px">
          <Typography color="GrayText">{`Vui lòng quay lại sau để trải nghiệm`}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <ButtonPositive LinkComponent={NavLink} {...{ to: PATHS.main }}>
            {`Quay về trang chủ`}
          </ButtonPositive>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ "& svg": { maxHeight: "400px", maxWidth: "100%" } }}
        >
          <DevelopBackground />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
