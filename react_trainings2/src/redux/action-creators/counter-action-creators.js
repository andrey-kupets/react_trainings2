import {
  CUSTOM,
  DEC,
  INC,
  RESET
} from "../action-types";

const inc = () => ({type: INC});
const dec = () => ({type: DEC});
const random = (payload) => ({type: CUSTOM, payload});
const reset = () => ({type: RESET});

export {
  inc,
  dec,
  random,
  reset,
}
