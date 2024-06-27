export type EnvironmentName =
  | "localhost"
  | "development"
  | "staging"
  | "production"
  | "";
export default function getEnvironmentName(): EnvironmentName {
  return (import.meta.env.VITE_ENV_NAME || "") as EnvironmentName;
}
