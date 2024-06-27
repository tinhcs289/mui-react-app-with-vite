import TypographyCommon from "@/components/typo/TypographyCommon";
import { useGetShopeeProductItemState } from "../context";

export default function ProductName() {
  const productName = useGetShopeeProductItemState(
    (s) => s?.product?.name || ""
  );
  return (
    <TypographyCommon
      variant="h5"
      fontSize="small"
      maxLines={2}
      fontWeight={500}
      title={productName}
      lineHeight="22px"
    >
      {productName}
    </TypographyCommon>
  );
}
