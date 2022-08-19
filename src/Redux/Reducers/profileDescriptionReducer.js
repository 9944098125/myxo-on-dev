/* eslint-disable import/no-anonymous-default-export */
import { UPDATE_TRAINER_BIO } from "../Actions/Types";

const initialState = {
  response: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRAINER_BIO:
      return {
        ...state,
        ...payload,
        response: payload,
      };
    default:
      return state;
  }
}
