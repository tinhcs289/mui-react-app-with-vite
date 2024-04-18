export default function getBaseApiUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || "";
}
