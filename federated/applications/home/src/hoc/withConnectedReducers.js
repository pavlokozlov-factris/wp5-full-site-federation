import React, { useEffect, useState } from 'react';
import { store, reducerManager } from '../store/store';

const withConnectedReducers = (Component, loadReducers) => (props) => {
  const [areRedcuersLoaded, setAreRedcuersLoaded] = useState(null);

  useEffect(() => {
    let reducers = null;
    loadReducers().then((value) => {
      reducers = value.default;
      setAreRedcuersLoaded(true)
      reducerManager.addAll(reducers);
      store.dispatch({type: 'REFRESH_STORE'});
    });

    return () => {
      reducerManager.removeAll(reducers);
      store.dispatch({type: 'REFRESH_STORE'});
    }
  }, []);

  return (
    areRedcuersLoaded ? <Component {...props} /> : <></>
  )
}

export {
  withConnectedReducers
}