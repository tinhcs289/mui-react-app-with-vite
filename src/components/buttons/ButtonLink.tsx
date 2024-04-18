import { NavLink } from "react-router-dom";
import type { ButtonCommonProps } from "./ButtonCommon";
import { ButtonCommon } from "./ButtonCommon";
export type ButtonLinkProps = ButtonCommonProps & { to: string };

export default function ButtonLink(props: ButtonLinkProps) {
  const { children, to, ...otherProps } = props;
  return (
    <ButtonCommon
      color="primary"
      variant="text"
      size="small"
      noTextTransform
      component={NavLink}
      // @ts-ignore
      to={to || ""}
      {...otherProps}
    >
      {children}
    </ButtonCommon>
  );
}
