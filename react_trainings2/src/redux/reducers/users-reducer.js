import {
  ON_USERS_LOADED,
  REMOVE_FROM_FIRING,
  SET_TO_FIRING
} from '../action-types';

const initialState = {
  users: [],
  employeesToFiring: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_USERS_LOADED: return {
      ...state,
      users: action.payload
    }

    case SET_TO_FIRING: return {
      ...state,
      employeesToFiring: [...state.employeesToFiring, action.payload]
    }

    case REMOVE_FROM_FIRING: return {
      ...state,
      employeesToFiring: state.employeesToFiring.filter(el => el !== action.payload)
      // employeesToFiring: [...state.employeesToFiring.filter(el => el !== action.payload)] // the same
    }

    default:
      // console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

export default reducer;
