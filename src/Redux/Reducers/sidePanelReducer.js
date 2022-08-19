/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE } from "../Actions/Types";

const initialState = {
  toggle: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE:
      return {
        ...state,
        ...payload,
        toggle: payload,
      };
    default:
      return state;
  }
}
