import type { TypographyCommonProps } from "@/components/typo/TypographyCommon";
import TypographyCommon from "@/components/typo/TypographyCommon";
import { styled } from "@mui/material";
import { useGetShopeeProductItemState } from "../context";

const BG_VOUCHER = "rgb(246, 145, 19)";

const LabelStyled = styled(TypographyCommon)<TypographyCommonProps>(
  ({ theme }) => ({
    background: BG_VOUCHER,
    color: theme.palette.common.white,
    border: `1px solid ${BG_VOUCHER}`,
    borderRadius: theme.spacing(0.5),
    fontSize: "10px",
    fontWeight: 700,
    padding: theme.spacing(0, 0.25),
  })
);

export default function LabelVoucher() {
  const labelText = useGetShopeeProductItemState(
    (s) => s?.product?.voucher_info?.label || ""
  );
  return labelText ? <LabelStyled>{labelText}</LabelStyled> : null;
}
