import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import App from "./components/app";
import "./assets/css/index.css";
import "./assets/css/media.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
