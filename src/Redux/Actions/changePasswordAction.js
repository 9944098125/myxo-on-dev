import { CHANGE_PASSWORD } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";


export const changePassword = (id, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/changePassword/" + id, data);
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data,
    });
    dispatch(alertActions.success(res.data));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    const { response } = err;
    const { request, ...errorObject } = response
    // console.log(errorObject);
    dispatch(alertActions.error(errorObject.data));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};