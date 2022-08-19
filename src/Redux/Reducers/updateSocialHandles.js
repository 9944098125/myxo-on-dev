/* eslint-disable import/no-anonymous-default-export */
import { UPDATE_TRAINER_SOCIAL_HANDLES } from "../Actions/Types";

const initialState = {
  response: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TRAINER_SOCIAL_HANDLES:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
