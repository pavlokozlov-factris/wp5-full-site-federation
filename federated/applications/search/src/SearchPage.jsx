import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Frame from "home/Frame";
import SearchContent from './SearchContent';
import store from "checkout/store";

const Details = React.lazy(() => import("details/Details"));
const DetailsRoute = () => (
  <React.Suspense fallback={<div />}>
    <Details />
  </React.Suspense>
);

import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <Frame page="search" /> */}
          <SearchContent />
        </Route>
        <Route path="/details/:id">
            {/* <Frame page="search" /> */}
            <DetailsRoute />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<SearchPage />, document.getElementById("app"));
