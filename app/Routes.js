import React from 'react';
import { Router, Route } from 'react-router';

import Home from './containers/Home';
import Help from './containers/Help';

export default (<Router>
                  <Route path='/' component={Home} />
                  <Route path='help' component={Help} />
               </Router>);
