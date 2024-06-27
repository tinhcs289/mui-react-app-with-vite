import wait from "@/helpers/async-helpers/wait";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { lazy } from "react";

const PageContainer = lazy(() =>
  wait().then(() => import("@/layouts/MainLayout/PageContainer"))
);

const DevelopBackground = lazy(() =>
  wait().then(() => import("@/components/svg/DevelopBackground"))
);

export default function Page() {
  const theme = useTheme();

  return (
    <PageContainer
      sx={{
        overflowY: "hidden",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(2),
          "& > svg": {
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            [theme.breakpoints.up("md")]: {
              width: "600px",
              maxWidth: "600px",
            },
          },
        }}
      >
        <DevelopBackground />
      </Box>
    </PageContainer>
  );
}
