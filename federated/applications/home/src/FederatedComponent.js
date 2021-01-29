import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStore } from 'react-redux';

const FederatedComponent = ({ mount, unMount, reducers }) => {
  const ref = useRef(null)
  const history = useHistory()
  const store = useStore()

  useEffect(() => {
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

    return () => unMount && unMount();
  }, [])

  return <div ref={ref} />;
}

export default FederatedComponent
