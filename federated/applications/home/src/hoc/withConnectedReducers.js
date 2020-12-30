import React, { useEffect, useState } from 'react';
import { store, reducerManager } from '../store/store';

const withConnectedReducers = (Component, loadReducers) => (props) => {
  const [areRedcuersLoaded, setAreRedcuersLoaded] = useState(false);

  useEffect(() => {
    let reducers = null;
    loadReducers().then((value) => {
      reducers = value.default;
      requestAnimationFrame(() => {
        // use delay to make sure that changes propagated in the redux store before showing the component
        // If the component has already been loaded (e.g. page visited in the same session),
        // then the component will be shown before redux changes propagated (without using delay)
        setAreRedcuersLoaded(true);
      });
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