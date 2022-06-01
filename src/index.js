import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "./scss/style.scss";

// import { MoralisProvider } from "react-moralis";

// ReactDOM.render(
//   <MoralisProvider appId="6idVGeXt1T5plgNsCtceAWeED68BYGqo6gu8czsf" serverUrl="https://kgtnjp5si3az.usemoralis.com:2053/server">
//     <App />
//   </MoralisProvider>,
//   document.getElementById("root"),
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
