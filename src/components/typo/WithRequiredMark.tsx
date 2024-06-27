import { AnyObject } from "@/types";
import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";

export type WithRequiredMarkProps = {
  children?: ReactNode;
  required?: boolean;
  mark?: ReactNode;
  MarkComponent?: ComponentType<any>;
  markComponentProps?: AnyObject;
  Component?: ComponentType<any>;
  componentProps?: AnyObject;
  spaces?: number;
};

export default function WithRequiredMark({
  children,
  required,
  mark = "*",
  MarkComponent = Fragment,
  markComponentProps,
  Component = Fragment,
  componentProps,
  spaces = 1,
}: WithRequiredMarkProps) {
  if (!children) return null;
  return (
    <Component {...componentProps}>
      {children}
      {!spaces ? null : (
        <>
          {Object.keys([...Array(spaces)]).map((s) => (
            <Fragment key={s}>&nbsp;</Fragment>
          ))}
        </>
      )}
      {!!required ? (
        <MarkComponent {...markComponentProps}>{mark}</MarkComponent>
      ) : null}
    </Component>
  );
}
