import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './containers/Home';

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={Home}/>
      </Route>
      <Route path="*" component={Home}/>
    </Router>
  </Provider>
);


export default Routes;
