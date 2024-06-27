import CardMedia from "@mui/material/CardMedia";
import { useGetShopeeProductItemState } from "../context";
import { IMAGES } from "@/constants/images";

export default function ProductImage() {
  const productImage = useGetShopeeProductItemState(
    (s) => s?.product?.image || ""
  );

  const productName = useGetShopeeProductItemState(
    (s) => s?.product?.name || ""
  );

  return productImage ? (
    <CardMedia
      component="img"
      loading="lazy"
      sx={{ height: 190 }}
      image={`https://cf.shopee.vn/file/${productImage}`}
      title={productName}
      aria-placeholder={IMAGES.imageLazy}
    />
  ) : null;
}
