import { TRAINER_PAYMENT, GET_TRAINER_PAYMENT } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

//Add Trainer Payment
export const addTrainerPayment = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/addPayment/" + id, data);
    dispatch({
      type: TRAINER_PAYMENT,
      payload: res.data,
    });
    dispatch(alertActions.success(res.data));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
    }, 3000);
  } catch (err) {
    console.log("error", err);
    dispatch(alertActions.error(err.response.data.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
    }, 3000);
  }
};

//Get Trainer Payment
export const getTrainerPayment = (id) => async (dispatch) => {
  try {
    const res = await api.get("/userDetails/getPayment/" + id);
    dispatch({
      type: GET_TRAINER_PAYMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log("error", err);
  }
};
