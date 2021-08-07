import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/Index";
import { Provider } from "react-redux";
import store from "./store/Index";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
