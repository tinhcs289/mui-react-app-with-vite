import TypographyCommon from "@/components/typo/TypographyCommon";
import numeral from "numeral";
import { useGetShopeeProductItemState } from "../context";

export default function ProductPrice() {
  const productPrice = useGetShopeeProductItemState(
    (s) => s?.product?.price || 0
  );

  return (
    <TypographyCommon color="primary" fontSize="small" fontWeight={700}>
      {numeral(productPrice / 100000).format("0,0[.]00$")}
    </TypographyCommon>
  );
}
