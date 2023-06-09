import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CommentContextProvider from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CommentContextProvider>
    <App />
  </CommentContextProvider>
);
