import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import "./LinkedAccounts.css";
import instagram from "../../Assets/Images/instagram.svg";
import facebook from "../../Assets/Images/facebook.svg";
import twitter from "../../Assets/Images/twitter.svg";
import starva from "../../Assets/Images/starva.svg";
import { updateTrainerSocialHandles } from "../../Redux/Actions/updateSocialHandles";
import Alert from "../Modal/modal";
import { profile_description } from "../../Redux/Actions/trainerProfileActions";
import { useNavigate } from "react-router";
import {roles } from '../Shared/constants'

function LinkedAccounts() {
  //Global Variables:
  const id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");

  //State Hook:
  const [values, setValues] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    starva: "",
  });

  //Redux State:
  const alert = useSelector((state) => state.alert);
  const data = useSelector((state) => state.trainerProfile);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Route Navigate:
  const navigation = useNavigate();

  //UseEffects (start):
  useEffect(() => {
    if (Number(role_id) === 2 || Number(role_id) === 3) {
      dispatch(profile_description(id));
    }
  }, [dispatch, role_id, id]);

  useEffect(() => {
    const social_links = data.social;
    setValues({
      instagram: social_links[0],
      facebook: social_links[1],
      twitter: social_links[2],
      starva: social_links[3],
    });
  }, [data]);

  useEffect(() => {
    if (Number(role_id) === roles.TRAINER_ROLE_ID) {
      if (alert.type === "success_clear") {
        navigation("/trainer-profile");
      }
    } else {
      if (alert.type === "success_clear") {
        navigation("/user-profile");
      }
    }
  }, [alert, navigation, dispatch, role_id]);
  //UseEffects (end):

  //OnChangeHandlers (start):

  const changeInstagramInput = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      instagram: event.target.value.trim(),
    }));
  };

  const changeFacebookInput = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      facebook: event.target.value.trim(),
    }));
  };

  const changeTwitterInput = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      twitter: event.target.value.trim(),
    }));
  };

  const changeStarvaInput = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      starva: event.target.value.trim(),
    }));
  };

  const handleSubmit = (event) => {
    if (Number(role_id) === 2 || Number(role_id) === 3) {
      event.preventDefault();
      const apiData = {
        social_media: [
          values.instagram,
          values.facebook,
          values.twitter,
          values.starva,
        ],
      };
      dispatch(updateTrainerSocialHandles(id, apiData));
    }
  };
  //OnChangeHandlers (end):

  return (
    <Fragment>
      {/* alert */}
      {alert.message && <Alert show={true} />}
      {/* heading */}
      <div className="row">
        <div className="col">
          <span className="main-heading mx-4">Social Media Accounts</span>
          <div className="mx-4">
            <hr></hr>
          </div>
        </div>
      </div>

      <form>
        <div className="row m-4 justify-content-between">
          {/* instagaram */}
          <div className="col-md-5">
            <div className="input-group mb-5">
              <span className="input-group-text" id="basic-addon1">
                <img src={instagram} alt="icon" />
              </span>
              <input
                type="search"
                name="instagram"
                value={values.instagram || ""}
                onChange={changeInstagramInput}
                id="search"
                className="form-control p-3 social"
                placeholder="Instagram"
                aria-label="instagram"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          {/* facebook */}
          <div className="col-md-5">
            <div className="input-group mb-5">
              <span className="input-group-text" id="basic-addon1">
                <img src={facebook} alt="icon" />
              </span>
              <input
                type="search"
                name="facebook"
                value={values.facebook || ""}
                onChange={changeFacebookInput}
                // id="search"
                className="form-control p-3 social"
                placeholder="Facebook"
                aria-label="facebook"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        {/* </div>
        <div className="row mt-4"> */}
          {/* twitter */}
          <div className="col-md-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src={twitter} alt="icon" />
              </span>
              <input
                type="search"
                name="twitter"
                value={values.twitter || ""}
                onChange={changeTwitterInput}
                // id="search"
                className="form-control p-3 social"
                placeholder="Twitter"
                aria-label="instagram"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          {/* starva */}
          <div className="col-md-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src={starva} alt="icon" />
              </span>
              <input
                type="search"
                name="starva"
                value={values.starva || ""}
                onChange={changeStarvaInput}
                // id="search"
                className="form-control p-3 social"
                placeholder="Starva"
                aria-label="facebook"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col text-end">
          <button
            className="primary-button btn mx-5 mt-5"
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  updateSocialHandles: state.updateSocialHandles,
});

export default connect(mapStateToProps, {
  updateTrainerSocialHandles,
})(LinkedAccounts);
