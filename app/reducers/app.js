import { stateTree } from './../store/state';

const initialState = Object.assign({}, stateTree);

const fusenrux = (reducer, actionType) => {
  return (reducer.hasOwnProperty(actionType) && reducer[actionType] || reducer.DEFAULT)();
};

export default (state = initialState, action) => {
  const reducer = {};

  reducer.TODOIST_STATUS_OK = () => {
    let newState = Object.assign({}, state);
    newState.todoist.status_ok = true;
    return newState;
  };

  reducer.SET_TODAY_LIST = () => {
    let newState = Object.assign({}, state);
    newState.todayList = action.data;
    return newState;
  };

  reducer.DEFAULT = () => state;

  return fusenrux(reducer, action.type);
};
