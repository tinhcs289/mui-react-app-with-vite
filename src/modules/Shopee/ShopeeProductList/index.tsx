import useWatchElementHeight from "@/hooks/common-hooks/useWatchElementHeight";
import { useGetPaginatedListState } from "@/modules/Shopee/context";
import ShopeeProductListItem from "@/modules/Shopee/ShopeeProductListItem";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { forwardRef, memo, useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";

const LoadingIndicator = memo(() => {
  const isLoading = useGetPaginatedListState(
    (s) => s?.requestState === "fetching"
  );

  return isLoading ? (
    <LinearProgress sx={{ position: "absolute", width: "100%" }} />
  ) : null;
});
LoadingIndicator.displayName = "LoadingIndicator";

const ListSkeleton = memo(() => {
  const isLoading = useGetPaginatedListState(
    (s) => s?.requestState === "fetching"
  );

  return isLoading ? (
    <Grid container width="100%" height="100%" overflow="hidden">
      {Object.keys([...Array(60)]).map((i) => (
        <Grid key={i} item xs={6} sm={4} md={3} lg={2} container>
          <Grid item xs={12} sx={{ p: 0.5 }}>
            <Box
              sx={{
                height: "276.17px",
                minHeight: "276.17px",
                background: (t) => t?.palette?.grey?.[400],
              }}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  ) : null;
});
ListSkeleton.displayName = "ListSkeleton";

const GridContainerStyled = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    paddingRight: theme.spacing(1),
  },
}));

const gridComponents = {
  List: forwardRef<HTMLDivElement, GridProps>(({ children, ...props }, ref) => {
    return (
      <GridContainerStyled ref={ref} {...props} container>
        {children}
      </GridContainerStyled>
    );
  }),
  Item: forwardRef<HTMLDivElement, GridProps>(({ children, ...props }, ref) => {
    // console.log({
    //   item: get(props, ["context", "data", get(props, "data-index", "")]),
    // });
    return (
      <Grid ref={ref} item xs={6} sm={4} md={3} lg={2} container {...props}>
        {children}
      </Grid>
    );
  }),
};

export default function ShopeeProductList(
  props: Partial<Omit<BoxProps<"div">, "children">>
) {
  const [rootRef, rootHeight] = useWatchElementHeight<HTMLDivElement>();
  const data = useGetPaginatedListState((s) => s?.itemsInPage);
  const pageSize = useGetPaginatedListState((s) => s?.pageSize || 60);

  const virtuosoContext = useMemo(
    () => ({
      data,
    }),
    [data]
  );

  return (
    <Box
      component="div"
      ref={rootRef}
      position="relative"
      width="100%"
      {...props}
    >
      <LoadingIndicator />
      <ListSkeleton />
      <VirtuosoGrid
        data={data || []}
        context={virtuosoContext}
        style={{ height: rootHeight }}
        totalCount={pageSize}
        components={gridComponents}
        itemContent={(_, product) => (
          <ShopeeProductListItem product={product} />
        )}
      />
    </Box>
  );
}
