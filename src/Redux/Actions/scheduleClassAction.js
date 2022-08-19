import { SCHEDULE_CLASS, GET_CLASSES, GET_CLASSES_ERROR, CANCEL_CLASS, GET_MONTHLY_CLASSES } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

//Update Trainer Social Handles
export const scheduleClass = (id, data) => async (dispatch) => {
  try {
    const res = await api.post("/class/addClass/" + id, data);
    // console.log(res.data)
    dispatch({
      type: SCHEDULE_CLASS,
      payload: res.data,
    });
    dispatch(alertActions.success(res.data));
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

export const getClasses = (id, data) => async (dispatch) => {
  try {
    const res = await api.get(`/class/getClass/${data}/${id}`);
    // console.log(res.data)
    dispatch({
      type: GET_CLASSES,
      payload: res.data,
    });
  } catch (err) {
    console.log("error", err);
    const { response } = err;
    const { request, ...errorObject } = response;
    dispatch({
      type: GET_CLASSES_ERROR,
      payload: errorObject.data,
    });
  }
};

// delete classes
export const deleteClass = (classId) => async (dispatch) => {
  try {
    const res = await api.delete("/class/deleteClass/" + classId);
    dispatch({
      type: CANCEL_CLASS,
      payload: res.data,
    });
    dispatch(alertActions.success(res.data));
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

// get classes by month
export const getClassByMonth = (date, id) => async (dispatch) => {
  try {
    const res = await api.get(`/class/getClassByMonth/${date}/${id}`);
    // console.log(res.data)
    dispatch({
      type: GET_MONTHLY_CLASSES,
      payload: res.data,
    });
  } catch (err) {
    const { response } = err;
    const { request, ...errorObject } = response;
    dispatch({
      type: GET_CLASSES_ERROR,
      payload: errorObject.data,
    });
  }
};