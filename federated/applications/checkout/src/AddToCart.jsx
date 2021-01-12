import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { addToCart } from "./checkout";
import {CHECKOUT_SET_ITEMS} from './store/checkout/actionConsts';

const AddToCart = ({ pokemon, addToCart }) => (
  <Button
    secondary
    onClick={() => addToCart(pokemon)}
    style={{ width: "100%" }}
  >
    Add To Cart
  </Button>
);

const postAddToCart = (pokemon) => (dispatch) =>
  addToCart(pokemon).then(({ items }) =>
    dispatch({
      type: CHECKOUT_SET_ITEMS,
      payload: items,
    })
  );

export default connect(
  () => ({}),
  (dispatch) => ({
    addToCart: (pokemon) => dispatch(postAddToCart(pokemon)),
  })
)(AddToCart);
