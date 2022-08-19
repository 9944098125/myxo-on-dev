import { TRAINER_PAYMENT, GET_TRAINER_PAYMENT } from "../Actions/Types";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  response: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TRAINER_PAYMENT:
      return {
        ...state,
        ...payload,
        response: payload,
      };
    case GET_TRAINER_PAYMENT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
