import React, { Suspense } from 'react';

const withLazyComponent = (LazyComponent) => {
  return (props) => {
    return (
      <Suspense fallback={<div />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

export {
  withLazyComponent
}