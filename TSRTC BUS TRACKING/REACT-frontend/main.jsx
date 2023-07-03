import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./Mainpage/App.jsx";
import App2 from "./Homepage/App2.jsx";
import Details from "./Details-bus/Details.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/main" element={<App2 />} />
        <Route path="/main/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
