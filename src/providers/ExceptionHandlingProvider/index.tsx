import type { ReactNode } from "react";
import React from "react";
type Props = { children?: ReactNode };
type State = { hasError?: boolean };

export default class ExceptionHandlingProvider extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: any) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.children}</>;
    }

    return this.props.children;
  }
}
