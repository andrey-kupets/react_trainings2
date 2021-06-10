import {CUSTOM, DEC, INC, ON_USERS_LOADED, REMOVE_FROM_FIRING, RESET, SET_TO_FIRING} from "../action-types";


const inc = () => ({type: INC});
const dec = () => ({type: DEC});
const random = (payload) => ({type: CUSTOM, payload});
const reset = () => ({type: RESET});

const getUsersDataFromApi = (payload) => ({type: ON_USERS_LOADED, payload});
const setToFiring = (payload) => ({type: SET_TO_FIRING, payload});
const removeFromFiring = (payload) => ({type: REMOVE_FROM_FIRING, payload});

export {
  inc,
  dec,
  random,
  reset,
  getUsersDataFromApi,
  setToFiring,
  removeFromFiring,
}
