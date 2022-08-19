/* eslint-disable import/no-anonymous-default-export */
import { SCHEDULE_CLASS,  GET_CLASSES, GET_CLASSES_ERROR, GET_MONTHLY_CLASSES } from "../Actions/Types";

const initialState = {
  response: "",
  error: "",
  monthlyResponse:""
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SCHEDULE_CLASS:
      return {
        ...state,
        ...payload,
      };
    case GET_CLASSES:
      return {
        ...state,
        response: payload,
      };
    case GET_CLASSES_ERROR:
    console.log(payload);
      return {
        ...state,
        response: "",
        error: "No data found",
      };
    case GET_MONTHLY_CLASSES:
      return {
        ...state,
        monthlyResponse: payload,
      }
    default:
      return state;
  }
}
