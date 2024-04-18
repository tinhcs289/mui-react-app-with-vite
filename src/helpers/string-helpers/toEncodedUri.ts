import toQueryString from "./toQueryString";

export default function toEncodedUri(
  url: string,
  queryStringObject: {
    [x: string]: string | number | boolean | (string | number | boolean)[];
  }
) {
  return `${url}?${toQueryString(queryStringObject)}`;
}
