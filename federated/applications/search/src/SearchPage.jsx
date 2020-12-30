import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { store } from './store/store';
import SearchFrame from './SearchFrame';

import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <SearchFrame />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<SearchPage />, document.getElementById("app"));
