import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Cart } from "react-bootstrap-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { withLazyComponent } from './hoc/withLazyComponent';
import { withConnectedReducers } from './hoc/withConnectedReducers';

// const Details = React.lazy(() => import("details/Details"));

const HomeRoute = withLazyComponent(React.lazy(() => import("home/Home")));
const SearchRoute = withConnectedReducers(
  withLazyComponent(React.lazy(() => import("search/Search"))),
  () => import("search/reducers"),
);
const CheckoutRoute = withConnectedReducers(
  withLazyComponent(React.lazy(() => import("checkout/Checkout"))),
  () => import("checkout/reducers"),
);

const Frame = ({ checkout = {}, page = "home" }) => (
  <Router>
    <Container>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand>
          <Link to="/" style={{ color: "white" }}>
            Pokeshop
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/search" style={{ color: "white" }}>
                Search
              </Link>
            </Nav.Link>
          </Nav>
          <Link
            to="/checkout"
            style={{
              paddingLeft: 10,
              paddingBottom: 15,
            }}
          >
            <Cart color="white" size={30} />
            <span
              style={{ color: "white", fontWeight: "bold", paddingLeft: 5 }}
            >
              {(checkout.items || []).reduce((a, { count }) => a + count, 0)}
            </span>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/" exact>
            <HomeRoute />
          </Route>
          <Route path="/search">
            <SearchRoute />
          </Route>
          <Route path="/checkout">
            <CheckoutRoute />
          </Route>
          <Route path="/details/:id">
            {/* <DetailsRoute /> */}
            <SearchRoute />
          </Route>
        </Switch>
      </Container>
    </Container>
  </Router>
);

export default connect((state) => state)(Frame);
