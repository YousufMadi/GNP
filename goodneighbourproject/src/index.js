import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//import 'bootstrap/dist/css/bootstrap.min.css';
import "./stylesheets/shared.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
