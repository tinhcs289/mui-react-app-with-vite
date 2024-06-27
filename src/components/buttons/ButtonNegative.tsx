import type { ButtonCommonProps } from "./ButtonCommon";
import ButtonCommon from "./ButtonCommon";

export type ButtonNegativeProps = ButtonCommonProps;

export default function ButtonNegative(props: ButtonNegativeProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonCommon color="primary" size="small" {...otherProps}>
      {children}
    </ButtonCommon>
  );
}
