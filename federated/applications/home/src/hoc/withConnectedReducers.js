import React, { useEffect, useState } from 'react';
import { store, reducerManager } from '../store/store';

const withConnectedReducers = (Component, loadReducers) => (props) => {
  const [reducers, setReducers] = useState(null);

  useEffect(() => {
    let reds = null;
    loadReducers().then((value) => {
      reds = value.default;
      setReducers(reds)
      reducerManager.addAll(reds);
      store.dispatch({type: 'REFRESH_STORE'});
    });

    return () => {
      reducerManager.removeAll(reds);
      store.dispatch({type: 'REFRESH_STORE'});
    }
  }, []);

  return (
    reducers ? <Component {...props} /> : <></>
  )
}

export {
  withConnectedReducers
}