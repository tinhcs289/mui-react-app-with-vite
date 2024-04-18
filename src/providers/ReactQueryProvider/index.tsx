import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function ReactQueryProvider(props: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props?.children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
