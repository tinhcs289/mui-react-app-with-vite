import { AnyObject } from "@/types";
import type { ComponentType, ReactNode } from "react";
import { Fragment } from "react";

function Spaces({ value = 0 }: { value?: number }) {
  return !value ? null : (
    <>
      {Object.keys([...Array(value)]).map((s) => (
        <Fragment key={s}>&nbsp;</Fragment>
      ))}
    </>
  );
}

export type WithIconProps = {
  children?: ReactNode;
  required?: boolean;
  mark?: ReactNode;
  StartIcon?: ComponentType<any>;
  startIconProps?: AnyObject;
  startIconSpaces?: number;
  EndIcon?: ComponentType<any>;
  endIconProps?: AnyObject;
  endIconSpaces?: number;
  Component?: ComponentType<any>;
  componentProps?: AnyObject;
};

export default function WithIcon({
  children,
  Component = Fragment,
  componentProps,
  StartIcon = Fragment,
  startIconProps,
  startIconSpaces,
  EndIcon = Fragment,
  endIconProps,
  endIconSpaces,
}: WithIconProps) {
  return (
    <Component {...componentProps}>
      {!!StartIcon ? (
        <>
          <StartIcon {...startIconProps} />
          <Spaces value={startIconSpaces} />
        </>
      ) : null}
      {children}
      {!!EndIcon ? (
        <>
          <Spaces value={endIconSpaces} />
          <EndIcon {...endIconProps} />
        </>
      ) : null}
    </Component>
  );
}
