import { useGetPaginatedListState } from "@/modules/Shopee/context";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useGetShopeeProductItemState } from "../context";
import TypographyCommon from "@/components/typo/TypographyCommon";

function OverlayImage(props?: { image?: string }) {
  return (
    <Box
      sx={{
        transition: "all ease .2s",
        content: "''",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "190px",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        zIndex: 1,
        backgroundImage: `url(https://cf.shopee.vn/file/${props?.image || ""})`,
      }}
    />
  );
}

export function ProductImageFlags() {
  const sets = useGetPaginatedListState((s) => s?.elementSets?.image_flag);
  const labelIds = useGetShopeeProductItemState((s) => s?.product?.label_ids);

  const elementSet = useMemo(() => {
    if (!sets) return null;
    if (!labelIds) return null;
    return sets.find(
      (elSet) =>
        labelIds?.includes?.(elSet?.product_label_ids?.[0] as any) || false
    );
  }, [sets, labelIds]);

  return elementSet?.displayed_image ? (
    <OverlayImage image={elementSet.displayed_image} />
  ) : null;
}

export function ProductImageOverlay() {
  const sets = useGetPaginatedListState((s) => s?.elementSets?.overlay_image);
  const labelIds = useGetShopeeProductItemState((s) => s?.product?.label_ids);

  const elementSet = useMemo(() => {
    if (!sets) return null;
    if (!labelIds) return null;
    return sets.find(
      (elSet) =>
        labelIds?.includes?.(elSet?.product_label_ids?.[0] as any) || false
    );
  }, [sets, labelIds]);

  return elementSet?.displayed_image ? (
    <OverlayImage image={elementSet.displayed_image} />
  ) : null;
}

export function ProductPromoSets() {
  const sets = useGetPaginatedListState((s) => s?.elementSets?.promotion_label);
  const labelIds = useGetShopeeProductItemState((s) => s?.product?.label_ids);

  const elementSets = useMemo(() => {
    if (!sets) return null;
    if (!labelIds) return null;
    return sets.filter(
      (elSet) =>
        labelIds?.includes?.(elSet?.product_label_ids?.[0] as any) || false
    );
  }, [sets, labelIds]);

  return elementSets?.map?.((s) => (
    <TypographyCommon
      key={s.id}
      sx={{
        borderRadius: (theme) => theme.spacing(0.5),
        color: (theme) => theme.palette.primary.main,
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        fontSize: "10px",
        fontWeight: 700,
        px: "2px",
      }}
    >
      {s?.displayed_texts?.[0]?.text || ""}
    </TypographyCommon>
  ));
}
