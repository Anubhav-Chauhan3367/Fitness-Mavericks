import React from "react";
import { createRoot } from "react-dom/client"; // Correct import
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // Create the root element

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
