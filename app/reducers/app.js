import { stateTree } from './../store/state';

const initialState = Object.assign({}, stateTree.counter);

const fusenrux = (reducer, actionType) => {
  return (reducer.hasOwnProperty(actionType) && reducer[actionType] || reducer.DEFAULT)();
};

export default (state = initialState, action) => {
  const reducer = {};

  reducer.INCREMENT = () => {
    let newState = Object.assign({}, state);
    newState.value++;
    return newState;
  };

  reducer.DEFAULT = () => state;

  return fusenrux(reducer, action.type);
};
