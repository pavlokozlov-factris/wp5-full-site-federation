import React from 'react';
import { render } from 'react-dom'
import { Route, Router } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from 'history'
import { Provider } from 'react-redux';

import LoginContent from './LoginContent';

const LoginFrame = ({ history, store }) => {
    const LoginRoutes = () => (
        <>
            <Route path="/login/" exact>
                <LoginContent />
            </Route>
            <Route path="/login/:id">
                <LoginContent />
            </Route>
        </>
    );

    return history
        ? (
            <Provider store={store}>
                <Router history={history} basename="/login">
                    <LoginRoutes />
                </Router>
            </Provider>
        )
        : <LoginRoutes />
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
  
    render(<LoginFrame history={history} store={store} />, el)
  
    return {
      onContainerNavigate({ pathname }) {
        if (history.location.pathname !== pathname) {
          history.push(pathname)
        }
      },
    }
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('login-root')

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

export { mount }

export default LoginFrame;
