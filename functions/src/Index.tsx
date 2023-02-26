import React from "react";
import {createRoot, Root} from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");
const root: Root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
