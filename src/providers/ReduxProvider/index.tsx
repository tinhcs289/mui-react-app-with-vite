import { http, interceptors } from "@/http/axios-instances";
import { reduxStore } from "@/redux";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

interceptors(http);

export default function ReduxProvider(props: { children?: ReactNode }) {
  const { children } = props;
  return <Provider store={reduxStore}>{children}</Provider>;
}
