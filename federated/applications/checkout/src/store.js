import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';

import { getCartItems } from "./checkout";

// const store = createStore(rootReducer, applyMiddleware(thunk));

/* store.dispatch((dispatch) =>
  getCartItems().then(({ items }) =>
    dispatch({
      type: "SET_ITEMS",
      payload: {
        items,
      },
    })
  )
); */

export default {}; // store;
