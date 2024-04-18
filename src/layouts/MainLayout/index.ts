import MainLayout, { MainLayoutPageContainer } from "./MainLayout";

export default MainLayout;

export { MainLayoutPageContainer };

export {
  useBreadcrumb,
  useGetStateMainLayout,
  useInitStateMainLayout,
  useSetStateMainLayout,
} from "./context";

export type { LayoutStates } from "./context";

export type { MenuItemData, MenuItemType } from "./types";
