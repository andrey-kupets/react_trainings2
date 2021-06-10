import {
  ON_USERS_LOADED,
  REMOVE_FROM_FIRING,
  SET_TO_FIRING
} from "../action-types";

const getUsersDataFromApi = (payload) => ({type: ON_USERS_LOADED, payload});
const setToFiring = (payload) => ({type: SET_TO_FIRING, payload});
const removeFromFiring = (payload) => ({type: REMOVE_FROM_FIRING, payload});

export {
  getUsersDataFromApi,
  setToFiring,
  removeFromFiring,
}
