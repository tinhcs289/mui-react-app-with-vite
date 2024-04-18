import callHttp from "@/helpers/async-helpers/callHttp";
import { http } from "@/http/axios-instances";
import { useQuery } from "react-query";

const LINK = "https://fakestoreapi.com/users";

export type UserFakeName = {
  firstname: string;
  lastname: string;
};

export type UserFakeAddressGeoLocate = {
  lat: string | number;
  long: string | number;
};

export type UserFakeAddress = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: UserFakeAddressGeoLocate;
};

export type UserFake = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserFakeName;
  address: UserFakeAddress;
  phone: string;
};

async function api() {
  const [error, data] = await callHttp<UserFake[]>(http.get(LINK)).waitFor(
    (r) => r?.data instanceof Array
  );
  if (error) return [];
  return data;
}

export default function useQueryFakeUsers() {
  return useQuery<UserFake[]>({
    queryKey: ["fakeUser/all"],
    queryFn: api,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
