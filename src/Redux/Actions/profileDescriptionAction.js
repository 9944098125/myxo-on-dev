import { UPDATE_TRAINER_BIO } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

//Update Trainer Bio
export const updateTrainerBio = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/addBio/" + id, data);
    dispatch({
      type: UPDATE_TRAINER_BIO,
      payload: res.data,
    });
    dispatch(alertActions.success("Successfully updated profile description"));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    console.log("error", err);
    dispatch(alertActions.error(err));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
