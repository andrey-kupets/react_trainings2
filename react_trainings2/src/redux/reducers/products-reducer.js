import {
  START_PRODUCTS_LOADING,
  END_PRODUCTS_LOADING,
  SET_PRODUCTS,
} from '../action-types';

const initialState = {
  products: [],
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: return {
      ...state,
      products: action.payload,
      // isLoading: false // may not remove isLoading from END-action
    };
    case START_PRODUCTS_LOADING: return {...state, isLoading: true};
    case END_PRODUCTS_LOADING: return {...state, isLoading: false};
    default:
      // console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
