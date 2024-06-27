import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetShopeeProductItemState } from "../context";

const BoxWrap = styled(Box)<BoxProps>(() => ({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
}));
const BoxContent = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  position: "relative",
  color: "#ee4d2d",
  backgroundColor: `rgba(255,212,36,.9)`,
  textTransform: "uppercase",
  ":after": {
    content: "''",
    width: 0,
    height: 0,
    left: 0,
    bottom: "-4px",
    position: "absolute",
    borderColor: "transparent rgba(255,212,36,.9)",
    borderStyle: "solid",
    borderWidth: "0 18px 4px",
  },
}));

export default function LabelDiscount() {
  const discount = useGetShopeeProductItemState(
    (s) => s?.product?.discount || ""
  );
  return discount ? (
    <BoxWrap>
      <BoxContent>
        <Typography fontSize="small">{discount}</Typography>
        <Typography fontSize="small" color="white">{`giảm`}</Typography>
      </BoxContent>
    </BoxWrap>
  ) : null;
}
