import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Frame from "home/Frame";
import DetailsContent from './DetailsContent';
import store from "checkout/store";

const DetailsPage = () => (
  <Router>
    <Container>
      <Switch>
        <Route path="/:id">
          <Provider store={store}>
            {/* <Frame page="search" /> */}
            <DetailsContent />
          </Provider>
        </Route>
      </Switch>
    </Container>
  </Router>
);

ReactDOM.render(<DetailsPage />, document.getElementById("app"));
