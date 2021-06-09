const initialState = {
  counter: 0,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_CUSTOM': return {...state, counter: ((state.counter = 1) * action.payload)}; // ?? what the cb style is?
    case 'INC': return {...state, counter: (state.counter + 1)}; // ?? what the cb style is?
    case 'DEC': return {...state, counter: state.counter - 1};
    case 'RESET': return {...state, counter: 0};
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}
