import { CHECKOUT_SET_ITEMS } from './actionConsts';
import { getCartItems, checkout } from '../../checkout';

const getItems = () => (dispatch) =>
  getCartItems().then(({ items }) =>
    dispatch({
      type: CHECKOUT_SET_ITEMS,
      payload: items,
    })
  )

const runCheckout = () => (dispatch) =>
  checkout().then((payload) =>
    dispatch({
      type: CHECKOUT_SET_ITEMS,
      payload,
    })
  );

export {
  getItems,
  runCheckout
}