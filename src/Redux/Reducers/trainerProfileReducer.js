/* eslint-disable import/no-anonymous-default-export */
import {
  GET_TRAINER_COVER_IMAGE,
  GET_TRAINER_PROFILE_DETAILS,
  GET_COVER_START,
  GET_PROFILE_START
} from "../Actions/Types";

const initialState = {
  coverPhoto: null,
  profilePhoto: null,
  userInfo: [],
  userBio: [],
  social: [],
  loading:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COVER_START:
      return{
        ...state,
        loading:true
      }
    case GET_TRAINER_COVER_IMAGE:
      return {
        ...state,
        ...payload,
        loading:false
      };
    case GET_PROFILE_START:
      return{
        ...state,
        loading:true
      }
    case GET_TRAINER_PROFILE_DETAILS:
      return {
        ...state,
        ...payload,
        loading:false
      };
    default:
      return state;
  }
}
