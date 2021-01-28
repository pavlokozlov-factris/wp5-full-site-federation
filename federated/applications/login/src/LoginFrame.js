import React from 'react';
import { Route } from "react-router-dom";

import LoginContent from './LoginContent';

const SearchFrame = () => (
  <>
    <Route path="/login/" exact>
      <LoginContent />
    </Route>
    <Route path="/login/:id">
      <LoginContent />
    </Route>
  </>
);

export default SearchFrame;
