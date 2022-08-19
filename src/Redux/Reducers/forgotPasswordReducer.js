/* eslint-disable import/no-anonymous-default-export */

import {
    SEND_MAIL
  } from "../Actions/Types";
  
  const initialState = {};
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SEND_MAIL:
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  }
