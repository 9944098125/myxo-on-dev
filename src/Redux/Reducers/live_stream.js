/* eslint-disable import/no-anonymous-default-export */
import {LIVE_STREAM_ERROR, LIVE_STREAM_TOKEN } from "../Actions/Types";

const initialState = {
  response:{},
  error:""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log("reducer",type,payload)
  switch (type) {
    case LIVE_STREAM_TOKEN:
      return {
        ...state,
        ...payload,
        response:payload
      };
      case LIVE_STREAM_ERROR:
      return {
        ...state,
        ...payload,
        error: payload
      };
    default:
      return state;
  }
}