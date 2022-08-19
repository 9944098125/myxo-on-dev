import { SEND_MAIL } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";


export const sendMail = (data) => async (dispatch) => {
  try {
    const res = await api.post("/userDetails/sendMail", data);
    dispatch({
      type: SEND_MAIL,
      payload: res.data,
    });
    dispatch(alertActions.success("Verify your email to reset your password"));
    setTimeout(() => {
      dispatch(alertActions.success_clear());
      dispatch(alertActions.clear());
    }, 3000);
  } catch (err) {
    console.log("error", err);
    const { response } = err;
    const { request, ...errorObject } = response;
    if(errorObject.data === "Not registered Email") {
      dispatch(alertActions.error("Unregistered email address!  Please enter registered email address"));
    }
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
