import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { store } from './store/store';
import LoginFrame from './LoginFrame';

import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <LoginFrame />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<LoginPage />, document.getElementById("app"));
