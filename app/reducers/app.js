import { stateTree } from './../store/state';

const initialState = Object.assign({}, stateTree.counter);

export default (state = initialState, action) => {
  const switchObj = {
    INCREMENT: () => {
      let newState = Object.assign({}, state);
      newState.value++;
      return newState;
    },
    DEFAULT: ()=> state
  };
  return (switchObj.hasOwnProperty(action.type) && switchObj[action.type] || switchObj.DEFAULT)();
};
