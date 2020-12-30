import React from 'react';
import { Route } from "react-router-dom";

import SearchContent from './SearchContent';

const Details = React.lazy(() => import("details/Details"));
const DetailsRoute = () => (
  <React.Suspense fallback={<div />}>
    <Details />
  </React.Suspense>
);

const SearchFrame = () => (
  <>
    <Route path="/search/" exact>
      <SearchContent />
    </Route>
    <Route path="/search/:id">
      <DetailsRoute />
    </Route>
  </>
);

export default SearchFrame;
