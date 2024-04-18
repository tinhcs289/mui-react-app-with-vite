export type EnvironmentName =
  | "local"
  | "development"
  | "staging"
  | "production"
  | "";
export default function getEnvironmentName(): EnvironmentName {
  return (import.meta.env.VITE_ENV_NAME || "") as EnvironmentName;
}
