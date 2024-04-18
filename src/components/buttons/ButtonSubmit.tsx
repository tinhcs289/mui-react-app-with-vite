import type { ButtonCommonProps } from "./ButtonCommon";
import { ButtonPositive } from "./ButtonPositive";

export type ButtonSubmitProps = ButtonCommonProps;

export function ButtonSubmit(props: ButtonSubmitProps) {
  const { children, ...otherProps } = props;
  return (
    <ButtonPositive type="submit" {...otherProps}>
      {children}
    </ButtonPositive>
  );
}
