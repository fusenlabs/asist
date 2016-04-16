import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import store from './store/store';

const appStore = store();

ReactDOM.render(
  <Routes store={appStore} />
  , document.getElementById('app'));
