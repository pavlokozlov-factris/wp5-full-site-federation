import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import checkoutReducers from "checkout/reducers";
import { createReducerManager } from './reducerManager';
import { reducers } from './reducers';

const configureStore = () => {
  const reducerManager = createReducerManager({
    ...reducers,
    ...checkoutReducers
  });

  const store = createStore(
    reducerManager.reduce,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }) : f => f,
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