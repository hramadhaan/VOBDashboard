import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import { firebaseConfig } from "services/Firebase";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import App from "layouts/App";

import authReducer from "./store/reducers/auth";
import categoryReducer from "./store/reducers/category";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.querySelector("#root"));
