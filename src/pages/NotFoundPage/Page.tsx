import Content404 from "@/modules/Content404";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { PageProps } from "./types";

export default function Page(props: PageProps) {
  const { contentOnly } = props;
  const { t } = useTranslation();
  const $Content = useMemo(() => {
    if (!contentOnly)
      return (
        <>
          <AppBar position="relative">
            <Toolbar>{t("notFound:pageNotFound")}</Toolbar>
          </AppBar>
          <Content404 />
        </>
      );
    return <Content404 />;
  }, [contentOnly, t]);
  return $Content;
}
