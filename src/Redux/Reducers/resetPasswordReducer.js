/* eslint-disable import/no-anonymous-default-export */

import {
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
    VERIFY_TOKEN_FAIL,
    VERIFY_TOKEN_SUCCESS
  } from "../Actions/Types";
  
  const initialState = {
    response: '',
    error: ''
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case VERIFY_TOKEN_SUCCESS:
        return {
          ...state,
          response: payload,
        };
        case VERIFY_TOKEN_FAIL:
        return {
          ...state,
          error: payload,
        };
      case UPDATE_PASSWORD_SUCCESS:
        return {
          ...state,
          response: payload,
        }
        case UPDATE_PASSWORD_FAIL:
        return {
          ...state,
          error: payload,
        }
      default:
        return state;
    }

}