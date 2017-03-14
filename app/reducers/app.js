import { stateTree } from './../store/state';

const initialState = Object.assign({}, stateTree);

const fusenrux = (reducer, actionType) => {
  return (reducer.hasOwnProperty(actionType) && reducer[actionType] || reducer.DEFAULT)();
};

export default (state = initialState, action) => {
  const reducer = {};
  let newState = Object.assign({}, state);

  reducer.TODOIST_STATUS_OK = () => {
    newState.todoist.status_ok = true;
    return newState;
  };

  reducer.SET_TODAY_LIST = () => {
    newState.todayList = action.data;
    return newState;
  };

  reducer.SET_LOADING = () => {
    return Object.assign({}, { ...state, loading: action.status });
  };

  reducer.FLAG_REMOVED_ITEM = () => {
    const item = newState.todayList.find(i => i.id === action.data);
    if (item) {
      item._removed = true;
    }
    return newState;
  };

  reducer.REMOVE_FLAGGED_ITEMS = () => {
    newState.todayList = newState.todayList.filter(i => !i._removed);
    return newState;
  };

  reducer.REMOVE_ITEM_BY_ID = () => {
    newState.todayList = newState.todayList.filter(i => i.id !== action.data);
    return newState;
  };

  reducer.DEFAULT = () => state;

  return fusenrux(reducer, action.type);
};
