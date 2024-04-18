export default function isObject(value: any) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.hasOwnProperty === "function"
  );
}
