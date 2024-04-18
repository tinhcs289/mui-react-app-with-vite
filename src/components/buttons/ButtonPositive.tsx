import type { ButtonCommonProps } from "./ButtonCommon";
import { ButtonCommon } from "./ButtonCommon";

export type ButtonPositiveProps = ButtonCommonProps;

export function ButtonPositive(props: ButtonCommonProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon
      color="primary"
      variant="contained"
      size="small"
      {...otherProps}
    >
      {children}
    </ButtonCommon>
  );
}
