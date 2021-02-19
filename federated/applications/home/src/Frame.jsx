import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Cart } from "react-bootstrap-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { withLazyComponent } from './hoc/withLazyComponent';
import { withConnectedReducers } from './hoc/withConnectedReducers';
import FederatedComponent from './FederatedComponent';

import { mount as loginMount, unMount as loginUnmount } from 'login/Login';
import { mount as vuejsMount } from 'vuejs/Vuejs';

// const Details = React.lazy(() => import("details/Details"));

const HomeRoute = withLazyComponent(React.lazy(() => import("home/Home")));
const SearchRoute = withConnectedReducers(
  withLazyComponent(React.lazy(() => import("search/Search"))),
  () => import("search/reducers"),
);
const LoginRoute = withConnectedReducers(
  withLazyComponent(React.lazy(() => import("login/Login"))),
  () => import("login/reducers"),
);
const CheckoutRoute = withLazyComponent(React.lazy(() => import("checkout/Checkout")));
// const VueRoute = withLazyComponent(React.lazy(() => import("vuejs/Vuejs")));

const Frame = ({ checkout = {}, page = "home" }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    import('checkout/storeActions')
    .then((module) => {
      dispatch(module.getItems());
    })
    
  }, []);

  return (
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
                <Link to="/login" style={{ color: "white" }}>
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/vuejs" style={{ color: "white" }}>
                  Vuejs
                </Link>
              </Nav.Link>
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
            {/* <Route path="/vue">
              <VueRoute />
            </Route> */}
            <Route path="/login">
              <FederatedComponent
                mount={loginMount}
                unMount={loginUnmount}
                // loadReducers={() => import("login/reducers")}
              />
            </Route>
            <Route path="/vuejs">
              <FederatedComponent
                mount={vuejsMount}
              />
            </Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  );
}

export default connect((state) => state)(Frame);
