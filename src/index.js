import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import BookBox from "./components/BookBox";
import Keycloak from "keycloak-js";
import axios from "axios";
import KeyCloakModel from "./models/KeyCloakModel";

const history = createHistory();
const keyCloakModel = KeyCloakModel;

const app = (
  <Router history={history}>
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <BookBox model={keyCloakModel} />}
        />
      </Switch>
    </div>
  </Router>
);

const kc = Keycloak("/keycloak.json");
const token = localStorage.getItem("kc_token");
const refreshToken = localStorage.getItem("kc_refreshToken");

kc.init({ onLoad: "login-required", token, refreshToken }).then(
  authenticated => {
    if (authenticated) {
      keyCloakModel.authenticated(kc);
      updateLocalStorage();
      ReactDOM.render(app, document.getElementById("app"));
    }
  }
);

axios.interceptors.request.use(config =>
  kc
    .updateToken(5)
    .then(refreshed => {
      if (refreshed) {
        updateLocalStorage();
      }
      config.headers.Authorization = "Bearer " + kc.token;
      return Promise.resolve(config);
    })
    .catch(() => {
      kc.login();
    })
);

const updateLocalStorage = () => {
  localStorage.setItem("kc_token", kc.token);
  localStorage.setItem("kc_refreshToken", kc.refreshToken);
};
