import ReactDOM from "react-dom/client";
import App from "./App";
import getEnvironmentName from "@/environment/getEnvironmentName";

console.log(`env: ${getEnvironmentName()}`);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
