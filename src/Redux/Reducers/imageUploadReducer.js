/* eslint-disable import/no-anonymous-default-export */
import { COVER_IMAGE_UPLOAD_START, PROFILE_IMAGE_UPLOAD, COVER_IMAGE_UPLOAD, PROFILE_IMAGE_UPLOAD_START } from "../Actions/Types";

const initialState = {
  response: "",
  loading:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COVER_IMAGE_UPLOAD_START:
      return{
        ...state,
        loading:true
      }
    case COVER_IMAGE_UPLOAD:
      return {
        ...state,
        ...payload,
        response: payload,
        loading:false
      };
      case PROFILE_IMAGE_UPLOAD_START:
        return{
          ...state,
          loading:true
        }
    case PROFILE_IMAGE_UPLOAD:
      return {
        ...state,
        ...payload,
        response: payload,
        loading:false
      };
    default:
      return state;
  }
}
