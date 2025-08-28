/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Clarity from "@microsoft/clarity";

const projectId = "t1y32eg5hi";
if (import.meta.env.MODE === "production") {
  Clarity.init(projectId);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
