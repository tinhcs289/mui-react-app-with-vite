import toSlugify from "@/helpers/string-helpers/toSlugify";
import type { ShopeeProductItem } from "@/mock/shopee/types";
import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import ButtonFindSimilar from "./components/ButtonFindSimilar";
import LabelDiscount from "./components/LabelDiscount";
import LabelVoucher from "./components/LabelVoucher";
import {
  ProductImageFlags,
  ProductImageOverlay,
  ProductPromoSets,
} from "./components/ProductElementSets";
import ProductImage from "./components/ProductImage";
import ProductName from "./components/ProductName";
import ProductPrice from "./components/ProductPrice";
import ProductSoldCount from "./components/ProductSoldCount";
import {
  ShopeeProductItemProvider,
  useGetShopeeProductItemState,
} from "./context";

function ProductItemGrid({ children, sx, ...otherProps }: GridProps) {
  const productUrl = useGetShopeeProductItemState(
    (s) =>
      `/san-pham/${toSlugify(s?.product?.name || "")}-${
        s?.product?.itemid || ""
      }`
  );

  const productName = useGetShopeeProductItemState(
    (s) => s?.product?.name || ""
  );

  return (
    <Grid
      item
      xs={12}
      container
      {...otherProps}
      sx={{ textDecorationLine: "none", p: 0.5, ...sx }}
      component={NavLink}
      {...({ to: productUrl, title: productName } as any)}
    >
      {children}
    </Grid>
  );
}

const ProductItemCard = styled(Card)<CardProps>(({ theme }) => ({
  width: "100%",
  position: "relative",
  transition: "all ease .2s",
  ":before": {
    transition: "all ease .2s",
    content: "''",
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    border: "2px solid transparent",
  },
  ":hover": {
    overflow: "unset",
    boxShadow: theme.shadows[4],
    ":before": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "& .btn-find-similar": {
      height: "34.75px",
    },
  },
}));

const LabelTextGroup = styled(Box)<BoxProps>(() => ({
  display: "flex",
  height: "1.8rem",
  alignItems: "center",
  overflow: "hidden",
  gap: "4px",
}));

export default function ShopeeProductListItem(props: {
  product: ShopeeProductItem;
}) {
  const product = useMemo(() => props?.product, [props?.product]);
  return (
    <ShopeeProductItemProvider product={product}>
      <ProductItemGrid>
        <ProductItemCard elevation={6}>
          <LabelDiscount />
          <ProductImageOverlay />
          <ProductImageFlags />
          <ProductImage />
          <CardContent sx={{ padding: "8px 8px 0 8px" }}>
            <ProductName />
            <LabelTextGroup>
              <LabelVoucher />
              <ProductPromoSets />
            </LabelTextGroup>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <ProductPrice />
            <ProductSoldCount />
          </CardActions>
          <ButtonFindSimilar />
        </ProductItemCard>
      </ProductItemGrid>
    </ShopeeProductItemProvider>
  );
}
