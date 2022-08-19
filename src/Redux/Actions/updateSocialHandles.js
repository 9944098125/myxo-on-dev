import { UPDATE_TRAINER_SOCIAL_HANDLES } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

//Update Trainer Social Handles
export const updateTrainerSocialHandles = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/addSocialMedia/" + id, data);
    dispatch({
      type: UPDATE_TRAINER_SOCIAL_HANDLES,
      payload: res.data,
    });
    dispatch(alertActions.success("Successfully Updated the user social media"));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    console.log("error", err);
    dispatch(alertActions.error(err.response.data.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
