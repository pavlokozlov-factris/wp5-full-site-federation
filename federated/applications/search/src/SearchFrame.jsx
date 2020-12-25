import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchContent from './SearchContent';

const Details = React.lazy(() => import("details/Details"));
const DetailsRoute = () => (
  <React.Suspense fallback={<div />}>
    <Details />
  </React.Suspense>
);

const SearchFrame = () => (
  <Router
    basename="/search"
  >
    <Switch>
      <Route path="/" exact>
        <SearchContent />
      </Route>
      <Route path="/:id">
        <DetailsRoute />
      </Route>
    </Switch>
  </Router>
);

export default SearchFrame;
