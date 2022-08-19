/* eslint-disable import/no-anonymous-default-export */
import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../Actions/Types";

const initialState = {
  token: "",
  signupFailMessage: "",
  loading:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_START:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
      return {
        ...state,
        ...payload,
        loginFailMessage: payload,
        loading:false
      };
    default:
      return state;
  }
}
