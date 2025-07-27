import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import Routes from "./routes";
import "@/style/base.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
