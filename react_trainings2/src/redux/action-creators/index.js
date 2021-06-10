import {CUSTOM, DEC, INC, ON_USERS_LOADED, RESET} from "../action-types";


const inc = () => ({type: INC});
const dec = () => ({type: DEC});
const random = (payload) => ({type: CUSTOM, payload});
const reset = () => ({type: RESET});
const getUsersDataFromApi = (payload) => ({type: ON_USERS_LOADED, payload});

export {
  inc,
  dec,
  random,
  reset,
  getUsersDataFromApi,
}
