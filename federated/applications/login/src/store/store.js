import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from './reducers';

const configureStore = () => {
  const store = createStore(
    combineReducers(reducers),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
  );

  return {
    store,
  }
}

const { store } = configureStore();

export {
  store,
}