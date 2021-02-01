import React from 'react';
import { render } from 'react-dom'
import { Route, Router } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from 'history'
import { Provider } from 'react-redux';

import LoginContent from './LoginContent';

const LoginFrame = ({ initialHistory, store }) => {
    const LoginRoutes = () => (
        <>
            <Route path="/login/" exact>
                <LoginContent />
            </Route>
            <Route path="/login/:id">
                <div>hello world</div>
            </Route>
        </>
    );

    const HistoryWrapper = !!initialHistory
      ? ({ children }) => (
        <Router history={initialHistory} basename="/login">
          {children}
        </Router>
      )
      : ({ children }) => <>{children}</>
    
    const Wrapper = !!store
        ? ({ children }) => (
          <Provider store={store}>
            <HistoryWrapper>
              {children}
            </HistoryWrapper>
          </Provider>
        )
        : ({children}) => (
          <HistoryWrapper>
            {children}
          </HistoryWrapper>
        )
    
    return (
      <Wrapper>
        <LoginRoutes />
      </Wrapper>
    )
}

const mount = (el, { onNavigate, defaultHistory, initialPath, store }) => {
    const history =
      defaultHistory ||
      createMemoryHistory({
        initialEntries: [initialPath],
      })
  
    if (typeof onNavigate === 'function') {
      history.listen(onNavigate)
    }
  
    render(<LoginFrame initialHistory={history} store={store} />, el)
  
    return {
      onContainerNavigate({ pathname }) {
        if (history.location.pathname !== pathname) {
          history.push(pathname)
        }
      },
    }
}

// console.log({ aa: process.env.NODE_ENV});
// if (process.env.NODE_ENV === 'development') {
//     const devRoot = document.getElementById('login-root')

//     if (devRoot) {
//         mount(devRoot, { defaultHistory: createBrowserHistory() })
//     }
// }

export { mount }

export default LoginFrame;
