import React, { useEffect } from 'react';
import { store, reducerManager } from '../store/store';

const withConnectedReducers = (Component, reducers = null) => (props) => {
  useEffect(() => {
    reducerManager.addAll(reducers);
    store.dispatch({type: 'TRIGGER_INITIALIZATION'});

    return () => {
      reducerManager.removeAll(reducers);
    }
  }, []);

  return (
    <Component {...props} />
  )
}

export {
  withConnectedReducers
}