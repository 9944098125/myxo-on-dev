/* eslint-disable import/no-anonymous-default-export */
import { UPDATE_TRAINER_ACCOUNT } from "../Actions/Types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRAINER_ACCOUNT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
