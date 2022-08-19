import { VERIFY_TOKEN_FAIL, 
        VERIFY_TOKEN_SUCCESS, 
        UPDATE_PASSWORD_SUCCESS, 
        UPDATE_PASSWORD_FAIL } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const verifyToken = (data) => async (dispatch) => {
    try {
      const res = await api.get("/userDetails/verify-token/"+ data);
      dispatch({
        type: VERIFY_TOKEN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log("error", err);
      const { response } = err;
      const { request, ...errorObject } = response;
      dispatch({
        type: VERIFY_TOKEN_FAIL,
        payload: errorObject.data
      });
      if(errorObject.data.err.message === 'jwt expired') {
        dispatch(alertActions.error("Token has expired! Please try again"));
      } 
      else if(errorObject.data.err.message === 'invalid token') {
        dispatch(alertActions.error("Invalid token! Please try again"));
      } 
      else if(errorObject.data.err.message === 'jwt malformed') {
        dispatch(alertActions.error(`${errorObject.data.error} in token verification, Please try again`));
      }
      setTimeout(() => {
        dispatch(alertActions.error_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  };


export const updatePassword = (tokenEmail, data) => async (dispatch) => {
  try {
    const res = await api.put("/userDetails/updatePassword/"+tokenEmail, data);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.success(res.data));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    console.log("error", err);
      const { response } = err;
      const { request, ...errorObject } = response;
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: errorObject.data,
    });
    dispatch(alertActions.error(errorObject.data.err.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

