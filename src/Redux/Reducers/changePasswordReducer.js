/* eslint-disable import/no-anonymous-default-export */
import { CHANGE_PASSWORD } from "../Actions/Types";

const initialState = {
  response:""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        ...payload,
        response:payload,
      };
    default:
      return state;
  }
}
