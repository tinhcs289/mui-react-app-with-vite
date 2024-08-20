import PATHS from "@/constants/paths";
import { i18n } from "@/translation";
import type { MenuItemData } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridViewIcon from "@mui/icons-material/GridView";
import PowerInputIcon from "@mui/icons-material/PowerInput";
import TableChartIcon from "@mui/icons-material/TableChart";
import { createItem } from "./helpers";

export const asideItems: MenuItemData[] = [
  createItem.link({
    label: i18n.t("aside:main"),
    labelText: i18n.t("aside:main"),
    Icon: DashboardIcon,
    url: PATHS.main,
    childs: [
      createItem.link({
        label: "Danh sách phân trang",
        labelText: "Danh sách phân trang",
        Icon: GridViewIcon,
        url: PATHS.gridList,
      }),
      createItem.link({
        label: "Danh sách bảng",
        labelText: "Danh sách bảng",
        Icon: TableChartIcon,
        url: PATHS.tableList,
      }),
      createItem.link({
        label: "Biểu mẫu và nhập liệu",
        labelText: "Biểu mẫu và nhập liệu",
        Icon: PowerInputIcon,
        url: PATHS.formInputs,
      }),
      createItem.link({
        label: "Biểu mẫu và nhập liệu 2",
        labelText: "Biểu mẫu và nhập liệu 2",
        Icon: PowerInputIcon,
        url: PATHS.dataEntries,
      }),
    ],
  }),
  // TODO defined aside menu items here
];
