import {
  CUSTOM,
  INC,
  DEC,
  RESET,
} from '../action-types';

const initFromLS = localStorage.getItem('COUNTER_OBJECT');

const initialState = initFromLS ? JSON.parse(initFromLS) : {
  counter: 0,
  isAllowedToChange: true, // false - to forbid some actions with counter
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOM: return {...state, counter: ((state.counter = 1) * action.payload)}; // ?? what the cb style is?
    case INC: return {...state, counter: (state.counter + 1)}; // ?? what the cb style is?
    case DEC: return {...state, counter: state.counter - 1};
    case RESET: return {...state, counter: 0};
    default:
      // console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
