import { combineReducers } from 'redux';

export const createReducerManager = (initialReducers) => {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove = [];

  return {
    add: (key, reducer) => {
      if (!key || !reducer) {
        return;
      }

      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    addAll: (newReducers) => {
      if (!newReducers) {
        return;
      }
      for (let [key, reducer] of Object.entries(newReducers)) {
        if (reducers[key]) {
          throw new Error(`Reducer with key '${key}' already exists in the store`);
        }
        reducers[key] = reducer;
      }
      combinedReducer = combineReducers(reducers);
    },
    remove: (key) => {
      if (!key) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    },
    removeAll: (newReducers) => {
      if (!reducers) {
        return;
      }
      for (let key of Object.keys(newReducers)) {
        delete reducers[key];
      }
      combinedReducer = combineReducers(reducers);
    },
    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    }
  }
}
