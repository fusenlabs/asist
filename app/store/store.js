import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
// import persistState from 'redux-localstorage';
import rootReducer from '../reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleWare),
  // persistState(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default () => {
  return createStoreWithMiddleware(rootReducer);
};
