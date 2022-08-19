import {
  COVER_IMAGE_UPLOAD_START,
  COVER_IMAGE_UPLOAD,
  PROFILE_IMAGE_UPLOAD_START,
  PROFILE_IMAGE_UPLOAD,
} from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";
import { cover_image } from "./trainerProfileActions";

//Update Cover Image
export const updateCoverImage = (id, data) => async (dispatch) => {
  
  // var formData = new FormData();
  // formData.append("coverPhoto", data[0]);
  try {
    dispatch({
      type: COVER_IMAGE_UPLOAD_START,
    });
    const res = await api.put("/userDetails/addUserCoverPhoto/" + id, data);
    if (res) {
      dispatch({
        type: COVER_IMAGE_UPLOAD,
        payload: res.data,
      });
      dispatch(alertActions.success("Successfully uploaded cover image"));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(cover_image(id));
        dispatch(alertActions.clear())
      }, 3000);
    }
  } catch (err) {
    console.log("error", err);
    dispatch(alertActions.error(err));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear())
    }, 3000);
  }
};

//Update Profile Image
export const updateProfileImage = (id, data) => async (dispatch) => {
  //console.log(data)
  // var formData = new FormData();
  // formData.append("profilePhoto", data);
  try {
    dispatch({
      type: PROFILE_IMAGE_UPLOAD_START,
    });
    const res = await api.put("/userDetails/addUserProfilePhoto/" + id, data);
    if (res) {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD,
        payload: res.data,
      });
      dispatch(alertActions.success("Successfully uploaded profile image"));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(cover_image(id));
        dispatch(alertActions.clear())
      }, 3000);
    }
  } catch (err) {
    console.log("error", err);
    dispatch(alertActions.error(err));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear())
    }, 3000);
  }
};
