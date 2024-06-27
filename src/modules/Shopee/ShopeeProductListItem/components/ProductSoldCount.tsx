import TypographyCommon from "@/components/typo/TypographyCommon";
import toAbbreviatedString from "@/helpers/string-helpers/toAbbreviatedString";
import { useGetShopeeProductItemState } from "../context";

export default function ProductSoldCount() {
  const soldCount = useGetShopeeProductItemState(
    (s) => s?.product?.historical_sold || 0
  );

  return (
    <TypographyCommon color="GrayText" fontSize="10px">
      {!soldCount
        ? ""
        : `Đã bán ${toAbbreviatedString({
            from: soldCount,
            units: ["N", "Tr", "T", "Nt"],
            toFix: 1,
          })}`}
    </TypographyCommon>
  );
}
