export default function capitalizeFirstLetter(value: any): string {
  if (typeof value !== "string") return "";

  const trimValue = value.trim();
  if (trimValue === "") return "";

  return trimValue.charAt(0).toUpperCase() + trimValue.slice(1);
}
