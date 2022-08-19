import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

//Register User/Trainer
export const register =
  (values,phoneCode, phoneNo, Country, userType) => async (dispatch) => {
    const body = {
      role_id: userType ? "2" : "3",
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_no: phoneNo,
      phone_code : phoneCode,
      password: values.password,
      country: Country,
    };
    try {
      dispatch({
        type: SIGNUP_START,
      });
      const res = await api.post("/register", body);
      if (res) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(
          alertActions.success(
            "Thank you! We have sent you email. Please click the link to activate your account"
          )
        );
        setTimeout(() => {
          dispatch(alertActions.success_clear());
          dispatch(alertActions.clear());
        }, 3000);
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data,
      });
      dispatch(alertActions.error(err.response.data.toString()));
      setTimeout(() => {
        dispatch(alertActions.error_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  };
