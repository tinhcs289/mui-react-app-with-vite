export default function getAppOrigin(): string {
  return import.meta.env.VITE_APP_ORIGIN || "";
}
