import React, { Suspense } from 'react';

const withLazyComponent = (LazyComponent) => {
  return (props) => (
    <Suspense fallback={<div />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export {
  withLazyComponent
}