import { combineReducers } from "redux";
import auth from "./loginReducer";
import sigup from "./sigupReducer";
import { alert } from "./alertReducer";
import trainerProfile from "./trainerProfileReducer";
import sidePanel from "./sidePanelReducer";
import imageUpload from "./imageUploadReducer";
import trainerAccount from "./TrainerAccountReducer";
import profileDescription from "./profileDescriptionReducer";
import updateSocialHandles from "./updateSocialHandles";
import trainerPayment from "./trainerPayment";
import changePassword from "./changePasswordReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import scheduleClass  from "./scheduleClassReducer";
import live_stream from "./live_stream";
import cancelClass from './cancelClassReducer';
import resetPasswordReducer from "./resetPasswordReducer";

export default combineReducers({
  sigup,
  auth,
  alert,
  trainerProfile,
  sidePanel,
  imageUpload,
  trainerAccount,
  profileDescription,
  updateSocialHandles,
  trainerPayment,
  changePassword,
  forgotPasswordReducer,
  scheduleClass,
  live_stream,
  cancelClass,
  resetPasswordReducer
});
