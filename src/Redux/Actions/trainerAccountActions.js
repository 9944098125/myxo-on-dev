import { UPDATE_TRAINER_ACCOUNT, UPDATE_RATES } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";


export const updateTrainerAccount = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/updateUserDetails/" + id, data);
    dispatch({
      type: UPDATE_TRAINER_ACCOUNT,
      payload: res.data,
    });
    dispatch(alertActions.success("Successfully updated the account details"));
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

export const updateRates = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/updateRates/" + id, data);
    dispatch({
      type: UPDATE_RATES,
      payload: res.data,
    });
    dispatch(alertActions.success("Successfully updated the account details"));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    console.log("error: ", err);
    dispatch(alertActions.error(err));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
