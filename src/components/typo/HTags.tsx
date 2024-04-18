import type { ComponentType, Ref } from "react";
import { forwardRef } from "react";
import type { TypographyCommonProps } from "./TypographyCommon";
import { TypographyCommon } from "./TypographyCommon";

export const H1 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h1" {...(props as any)} ref={ref} component="h1">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h1">>;

export const H2 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h2" {...(props as any)} ref={ref} component="h2">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h2">>;

export const H3 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h3" {...(props as any)} ref={ref} component="h3">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h3">>;

export const H4 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h4" {...(props as any)} ref={ref} component="h4">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h4">>;

export const H5 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h5" {...(props as any)} ref={ref} component="h5">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h5">>;

export const H6 = forwardRef(function H1ForwardRef(
  { children, ...props }: TypographyCommonProps<"h1">,
  ref?: Ref<HTMLHeadingElement>
) {
  return (
    <TypographyCommon variant="h6" {...(props as any)} ref={ref} component="h6">
      {children}
    </TypographyCommon>
  );
}) as ComponentType<TypographyCommonProps<"h6">>;
