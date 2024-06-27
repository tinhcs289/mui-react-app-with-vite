import wait from "@/helpers/async-helpers/wait";
import { useTheme } from "@mui/material";
import { lazy } from "react";

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

const DemoForm = lazy(() => wait().then(() => import("@/modules/_DemoForm")));

export default function Page() {
  const theme = useTheme();
  return (
    <PageContainer maxWidth="sm" sx={{ overflowY: "hidden", height: "100%" }}>
      <DemoForm
        sx={{
          padding: theme.spacing(1),
          background: theme.palette.background.paper,
          borderRadius: theme.spacing(1),
          boxShadow: theme.shadows[2],
        }}
      />
    </PageContainer>
  );
}
