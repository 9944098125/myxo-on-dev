import api from "../Api/Api";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./Types";
import { alertActions } from "./alertActions";

// Mobile or Email login for user/trainer:
export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const res = await api.post("/login", data);
    if (res) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token && res.data.token,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

// Social Logins for user/trainer:
export const googleLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const res = await api.post(`/auth/google`, data);
    if (res) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token && res.data.token,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data && err.response.data,
    });
  }
};

//Faceboo login for user/trainer
export const facebookLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const res = await api.post(`/auth/facebook`, data);
    if (res) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token && res.data.token,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data && err.response.data,
    });
  }
};

//logout user
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
