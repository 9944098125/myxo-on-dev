import { TOGGLE } from "./Types";

//Toggle data
const Toggle = (data) => {
  return {
    type: TOGGLE,
    payload: data,
  };
};

export default Toggle;
