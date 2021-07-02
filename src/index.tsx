import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import ToolContainer from "./ToolContainer";

// 将 react 挂载到 window 上
window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <ToolContainer toolKey="alex" />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
