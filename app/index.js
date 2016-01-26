import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './Routes';
import store from './store/store';

const myStore = store();

ReactDOM.render(
  <Provider store={myStore}>
    {Routes}
  </Provider>
  , document.getElementById('app'));
