import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import CheckoutContent from './CheckoutContent';
// import Frame from "home/Frame";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  return (
    <Provider store={store}>
      {/* <Frame page="checkout" /> */}
      <CheckoutContent />
    </Provider>
  );
};

ReactDOM.render(<CheckoutPage />, document.getElementById("app"));
