import type { GetPaginatedList } from "@/components/list/PaginatedList";
import callHttp from "@/helpers/async-helpers/callHttp";
import { does } from "@/helpers/common-helpers/isValidAsYupSchema";
import { httpMock, mockAdapter } from "@/http/axios-instances";
import page1 from "@/mock/shopee/products/page1.json";
import page2 from "@/mock/shopee/products/page2.json";
import page3 from "@/mock/shopee/products/page3.json";
import page4 from "@/mock/shopee/products/page4.json";
import page5 from "@/mock/shopee/products/page5.json";
import page6 from "@/mock/shopee/products/page6.json";
import page7 from "@/mock/shopee/products/page7.json";
import page8 from "@/mock/shopee/products/page8.json";
import page9 from "@/mock/shopee/products/page9.json";
import type { ShopeeProductItem } from "@/mock/shopee/types";
import * as yup from "yup";

const LINK = "/api/products/bundle";
const PAGE_SIZE = 60;

mockAdapter
  .onGet(LINK, { params: { pageIndex: 1, pageSize: PAGE_SIZE } })
  .reply(200, page1);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 2, pageSize: PAGE_SIZE } })
  .reply(200, page2);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 3, pageSize: PAGE_SIZE } })
  .reply(200, page3);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 4, pageSize: PAGE_SIZE } })
  .reply(200, page4);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 5, pageSize: PAGE_SIZE } })
  .reply(200, page5);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 6, pageSize: PAGE_SIZE } })
  .reply(200, page6);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 7, pageSize: PAGE_SIZE } })
  .reply(200, page7);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 8, pageSize: PAGE_SIZE } })
  .reply(200, page8);

mockAdapter
  .onGet(LINK, { params: { pageIndex: 9, pageSize: PAGE_SIZE } })
  .reply(200, page9);

const getProducts: GetPaginatedList<ShopeeProductItem> = async ({
  pageIndex = 1,
  pageSize = PAGE_SIZE,
}) => {
  const params = { pageIndex, pageSize };
  const [error, data] = await callHttp(httpMock.get(LINK, { params })).waitFor(
    (response) =>
      does(response?.data).matchWith(
        yup.object().shape({
          total: yup.number().required().min(1),
          item: yup.array().required().min(1),
        })
      )
  );

  if (error)
    return {
      result: [],
      totalCount: 0,
    };

  return {
    totalCount: data.total,
    result: data.item,
  };
};
export default getProducts;
