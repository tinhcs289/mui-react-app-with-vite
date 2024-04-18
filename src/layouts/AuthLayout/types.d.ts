import { AuthLayoutVariantEnum } from "./constants";
import type { ReactNode } from "react";
export type AuthLayoutVariant = `${AuthLayoutVariantEnum}`;
export type AuthLayoutProps = {
  children?: ReactNode;
  variant: AuthLayoutVariant;
};
