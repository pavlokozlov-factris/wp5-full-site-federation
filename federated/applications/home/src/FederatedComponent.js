import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from 'react-redux';
import { reducerManager } from './store/store';


const FederatedComponent = ({ mount, unMount, loadReducers }) => {
  const [areRedcuersLoaded, setAreRedcuersLoaded] = useState(false);
  const ref = useRef(null)
  const history = useHistory()
  const store = useStore()

  useEffect(() => {
    if (areRedcuersLoaded || !loadReducers) {
      const { onContainerNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({ pathname }) => {
          if (history.location.pathname !== pathname) {
            history.push(pathname)
          }
        },
        store
      })

      if (typeof onContainerNavigate === 'function') {
        history.listen(onContainerNavigate)
      }
    }

    
  }, [areRedcuersLoaded, loadReducers])

  useEffect(() => {
    let reducers = null;
    if (loadReducers) {
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
      
    }

    return () => {
      if (loadReducers) {
        reducerManager.removeAll(reducers);
        store.dispatch({type: 'REFRESH_STORE'});
      }
      if (unMount) unMount();
    }
  }, []);

  return <div ref={ref} />;
}

export default FederatedComponent
