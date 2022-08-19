/* eslint-disable import/no-anonymous-default-export */
import { CANCEL_CLASS } from "../Actions/Types";

const initialState = {
  response: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CANCEL_CLASS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
