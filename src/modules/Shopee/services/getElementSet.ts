import callHttp from "@/helpers/async-helpers/callHttp";
import arrayOrEmpty from "@/helpers/format-helpers/arrayOrEmpty";
import { httpMock, mockAdapter } from "@/http/axios-instances";
import data from "@/mock/shopee/element-sets.json";
import type { ShopeeElementSet } from "@/mock/shopee/types";

const LINK = "/api/products/element_set";

mockAdapter.onGet(LINK).reply(200, data);

export default async function getElementSet(): Promise<ShopeeElementSet> {
  const [error, data] = await callHttp<ShopeeElementSet>(
    httpMock.get(LINK)
  ).waitForSuccess();

  if (error)
    return {
      image_flag: [],
      overlay_image: [],
      promotion_label: [],
    };

  return {
    image_flag: arrayOrEmpty(data.image_flag),
    overlay_image: arrayOrEmpty(data.overlay_image),
    promotion_label: arrayOrEmpty(data.promotion_label),
  };
}
