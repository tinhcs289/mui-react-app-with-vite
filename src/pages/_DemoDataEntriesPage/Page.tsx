import wait from "@/helpers/async-helpers/wait";
import { Box, useTheme } from "@mui/material";
import { lazy } from "react";

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

const DemoDataEntries = lazy(() =>
  wait().then(() => import("@/modules/_DemoDataEntries"))
);

export default function Page() {
  const theme = useTheme();
  return (
    <PageContainer maxWidth="md" sx={{ overflowY: "hidden", height: "100%" }}>
      <Box
        sx={{
          padding: theme.spacing(1),
          background: theme.palette.background.paper,
          borderRadius: theme.spacing(1),
          boxShadow: theme.shadows[2],
          height: "100%"
        }}
      >
        <DemoDataEntries />
      </Box>
    </PageContainer>
  );
}
