import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import * as AppActions from './actions/app';
import * as utils from './utils';

import Home from './containers/Home';
import Auth from './containers/Auth';

let actionDispatcher = null;
const parseUrl = () => {
  return (nextState, replace, next) => {
    // step 1: parse url
    const urlParams = utils.getURLParams(window.location.search);
    // step 2: are code & state defined?
    if (urlParams.code && urlParams.state) {
      // step 3: validate state
      const validState = urlParams.state === localStorage.state;
      if (validState) {
        // step 4: exchange access token
        actionDispatcher.dispatch(
          AppActions.getToken(urlParams.code)
        );
      } else {
        console.warn('state validation failed. Abort for security.');
        // auth required
        replace('/auth');
        next();
      }
    } else {
      if (localStorage.access_token) { // step 5: has access token stored
        // step 6: set an access token
        actionDispatcher.dispatch(
          AppActions.setToken(localStorage.access_token)
        );
      } else {
        // auth required
        replace('/auth');
      }

      next();
    }
  };
};

const routes = {
  path: '/',
  indexRoute: { component: Home, onEnter: parseUrl() },
  childRoutes: [
    { path: '/auth', component: Auth },
  ],
};
const Routes = ({ store }) => {
  actionDispatcher = store;
  return (
    <Provider store={store}>
      <Router history={hashHistory} routes={ routes } />
    </Provider>
  );
};

export default Routes;
