import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function capitalizeText(value: any): string {
  if (typeof value !== "string") return "";
  const trimValue = value.trim();
  if (trimValue === "") return "";
  return trimValue
    .split(" ")
    .map((w) => capitalizeFirstLetter(w))
    .join(" ");
}
