import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import checkoutReducers from "checkout/reducers";
import loginReducers from "login/reducers";
import { createReducerManager } from './reducerManager';
import { reducers } from './reducers';

const configureStore = () => {
  const reducerManager = createReducerManager({
    ...reducers,
    ...checkoutReducers,
    ...loginReducers
  });

  const store = createStore(
    reducerManager.reduce,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
  );

  return {
    store,
    reducerManager
  }
}

const { store, reducerManager } = configureStore();

export {
  store,
  reducerManager
}