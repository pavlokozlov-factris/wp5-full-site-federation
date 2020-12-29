import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { addToCart } from "./checkout";

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
      type: "SET_ITEMS",
      payload: items,
    })
  );

export default connect(
  () => ({}),
  (dispatch) => ({
    addToCart: (pokemon) => dispatch(postAddToCart(pokemon)),
  })
)(AddToCart);
