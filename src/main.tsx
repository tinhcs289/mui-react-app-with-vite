import ReactDOM from "react-dom/client";
import App from "./App";
import getEnvironmentName from "@/environment/getEnvironmentName";

const env_name = getEnvironmentName();

console.log(`env: ${env_name}`);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

if (!["localhost", "development"].includes(env_name)) {
  window.console.log = () => {};
  window.console.warn = () => {};
}
