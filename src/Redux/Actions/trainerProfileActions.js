import {
  GET_TRAINER_COVER_IMAGE,
  GET_TRAINER_PROFILE_DETAILS,
  GET_COVER_START,
  GET_PROFILE_START,
} from "./Types";
import api from "../Api/Api";

// Get Cover Image
export const cover_image = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COVER_START,
    });
    const res = await api.get("/userDetails/getUserProfileCoverPhoto/" + id);
    if (res) {
      dispatch({
        type: GET_TRAINER_COVER_IMAGE,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
};

//Get Profile Description
export const profile_description = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROFILE_START,
    });
    const res = await api.get("/userDetails/getUserInfo/" + id);
    if (res) {
      dispatch({
        type: GET_TRAINER_PROFILE_DETAILS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
};
