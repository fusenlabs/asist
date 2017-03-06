import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
// import persistState from 'redux-localstorage';
import rootReducer from '../reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleWare),
  // persistState(),
  window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
)(createStore);

export default () => {
  return createStoreWithMiddleware(rootReducer);
};
