import React, { useEffect, useState } from "react";
import "./SideMenu.css";
import logo from "../../Assets/Images/myxo.png";
import toggleIconLeft from "../../Assets/Images/angle-down-small.svg";
import logoM from "../../Assets/Images/M.png";
import help from "../../Assets/Images/question-circle.svg";
import logoutIcon from "../../Assets/Images/Icon-import.svg";
import toggleIconRight from "../../Assets/Images/toggleRight.svg";
import bell from "../../Assets/Images/bell-on.svg";
import message from "../../Assets/Images/message-boards.svg";
import helpDark from "../../Assets/Images/question-circle-dark.svg";
import logoutDark from "../../Assets/Images/Icon-import-dark.svg";
import bars from "../../Assets/Images/bars.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../Redux/Actions/loginAction";
import { Navigate, NavLink } from "react-router-dom";
import Toggle from "../../Redux/Actions/sidePanelAction";
import { cover_image } from "../../Redux/Actions/trainerProfileActions";
import noProfileImage from "../../Assets/Images/noProfile.png";

export const SideMenu = (props) => {
  //State Hook:
  const [activeToggle, setActiveToggle] = useState(false);
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState("");

  //Redux State:
  const data = useSelector((state) => state.trainerProfile);
  const role_id = useSelector((state) => state.auth);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //UseEffects (start):
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(cover_image(id));
  }, [dispatch]);

  useEffect(() => {
    setProfile(data.profilePhoto);
  }, [data.profilePhoto]);
  //UseEffects (end):

  if (props.auth.isAuthenticated === false || props.auth.role_id === null) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className={active ? "darkTheme wrapper" : "lightTheme wrapper"}>
        <div className={activeToggle ? "active1" : "sidebar"}>
          {/* logo */}
          <div
            className="app-logo"
            onClick={() => {
              setActive(!active);
            }}
          >
            <img src={logo} alt="logo" id="logo1" />
            <img src={logoM} alt="smallLogo" id="logo2" />
          </div>

          {/* sidebar links */}
          <div className="sidebar-links">
            <NavLink
              to={`${
                Number(role_id.role_id) === 2
                  ? "/trainer-account"
                  : "/user-account"
              }`}
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2535 5.89618C16.2535 8.79567 13.903 11.1462 11.0035 11.1462C8.10404 11.1462 5.75354 8.79567 5.75354 5.89618C5.75354 2.99668 8.10404 0.646179 11.0035 0.646179C13.903 0.646179 16.2535 2.99668 16.2535 5.89618ZM21.5035 20.771C21.5035 26.896 0.50354 26.896 0.50354 20.771C0.50354 9.94289 21.5035 10.0523 21.5035 20.771Z"
                  fill="#323546"
                />
              </svg>
              <span className="sidebar-links-name">Account</span>
            </NavLink>
          </div>

          <div className="sidebar-links">
            <NavLink
              to="/finance"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5035 0.251953L2.50354 0.248047C1.25354 0.248047 0.00354004 1.50195 0.00354004 2.74805V15.252C0.00354004 16.502 1.25354 17.752 2.50354 17.752H17.5035C18.7535 17.752 20.0035 16.502 20.0035 15.252V2.74805C20.0035 1.50195 18.7535 0.251953 17.5035 0.251953ZM17.5035 15.252H2.50354V6.50195H17.5035V15.252ZM17.5035 4.00195H2.50354V2.74805H17.5035V4.00195Z"
                  fill="#323546"
                />
                <path
                  d="M11.8785 10.252H14.3785C16.8278 10.252 16.8512 14.002 14.3785 14.002H11.8785C9.40588 14.002 9.36682 10.252 11.8785 10.252Z"
                  fill="#323546"
                />
              </svg>
              <span className="sidebar-links-name">Finance</span>
            </NavLink>
          </div>

          {/* toggle icon */}
          <div
            className="toggle-icon btn mt-5 mb-5"
            onClick={() => {
              setActiveToggle(!activeToggle);
              dispatch(Toggle(!activeToggle));
            }}
          >
            {activeToggle ? (
              <img src={toggleIconRight} alt="toggleIcon" />
            ) : (
              <img src={toggleIconLeft} alt="toggleIcon" />
            )}
          </div>

          <div className="sidebar-links">
            {active ? (
              <img src={help} alt="help and support" />
            ) : (
              <img src={helpDark} alt="help and support" />
            )}
            <span className="sidebar-links-name">Help & support</span>
          </div>

          <div className="sidebar-links">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.6612 15.3557C24.787 14.5084 24.6339 13.2073 24.5573 12.6169L27.2094 10.8567C27.9421 10.3483 28.1718 9.37524 27.7507 8.59352L25.7986 5.14955C25.3666 4.34596 24.3933 4.0125 23.5566 4.37329L20.7569 5.65795C20.0515 5.08942 18.8813 4.46076 18.0283 4.12729L17.6619 1.50879C17.5416 0.64506 16.798 0 15.9231 0H12.0953C11.2149 0 10.4767 0.650527 10.3564 1.51425L10.001 4.07809C8.9894 4.49902 7.98325 5.12222 7.25051 5.66888L4.51642 4.34596C3.7126 4.02889 2.85409 4.09996 2.41664 4.84889L0.240301 8.18352C-0.191685 8.91605 -0.0276398 9.85084 0.623074 10.403L3.37357 12.6005C3.28608 13.2401 3.20953 14.5248 3.34076 15.3831L0.748842 17.1652C0.0106375 17.6845 -0.213558 18.6794 0.229365 19.4611L2.35649 22.9871C2.80488 23.7688 3.77822 24.0859 4.60391 23.7196L7.25051 22.3147C7.97232 22.8723 9.13704 23.583 9.99554 23.9164L10.3072 26.442C10.4111 27.3221 11.1548 27.9836 12.0461 27.9891L15.9887 28C16.88 28 17.6291 27.3385 17.733 26.4584L18.0228 23.8946C19.0454 23.4846 20.057 22.9434 20.7788 22.3749L23.6605 23.5611C24.5026 23.9547 25.5088 23.6267 25.9517 22.8122L27.789 19.5267C28.2046 18.756 27.9913 17.7993 27.2805 17.2854L24.6612 15.3557ZM14.0147 18.7724C8.34415 18.7724 7.97778 10.0258 14.0147 10.0258C19.9586 10.0258 19.6852 18.7724 14.0147 18.7724Z"
                  fill="#323546"
                />
              </svg>
              <span className="sidebar-links-name">Settings</span>
            </NavLink>
          </div>

          <div className="sidebar-links logout" onClick={props.logout}>
            {active ? (
              <img src={logoutIcon} alt="logout" />
            ) : (
              <img src={logoutDark} alt="logout" />
            )}
            <span className="sidebar-links-name">Logout</span>
          </div>
        </div>

        {/* content */}
        <div className={activeToggle ? "activeContent" : "content"}>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-default my-auto">
              <div
                className="m-2"
                id="mobileToggle"
                onClick={() => {
                  setActiveToggle(!activeToggle);
                  dispatch(Toggle(!activeToggle));
                }}
              >
                <img src={bars} alt="barIcon" />
              </div>
              <button
                className="navbar-toggler ms-auto"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <img src={bars} alt="barIcon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav justify-content-between w-100 mx-4">
                  <li className="mt-1">
                    {role_id.role_id === "2" || role_id.role_id === 2 ? (
                      <NavLink
                        to="/trainer-profile"
                        className={({ isActive }) =>
                          isActive ? "activeNavLink" : "navLink"
                        }
                      >
                        <svg
                          width="23"
                          height="26"
                          viewBox="0 0 26 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.2273 11.2219L14.225 1.22504C13.5414 0.541443 12.4586 0.541443 11.775 1.22504L1.77266 11.2274C1.11641 11.8836 0.75 12.775 0.75 13.7047V28H11.25V19.25C11.25 16.9149 14.75 16.9149 14.75 19.25V28H25.25V13.6993C25.25 12.7696 24.8836 11.8782 24.2273 11.2219ZM21.75 24.5H18.25V19.25C18.25 12.25 7.75 12.25 7.75 19.25C7.75 20.4149 7.75 23.3352 7.75 24.5H4.25V14L13 5.25004L21.75 14V24.5Z"
                            fill="#323546"
                          />
                        </svg>
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/user-profile"
                        className={({ isActive }) =>
                          isActive ? "activeNavLink" : "navLink"
                        }
                      >
                        <svg
                          width="23"
                          height="26"
                          viewBox="0 0 26 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.2273 11.2219L14.225 1.22504C13.5414 0.541443 12.4586 0.541443 11.775 1.22504L1.77266 11.2274C1.11641 11.8836 0.75 12.775 0.75 13.7047V28H11.25V19.25C11.25 16.9149 14.75 16.9149 14.75 19.25V28H25.25V13.6993C25.25 12.7696 24.8836 11.8782 24.2273 11.2219ZM21.75 24.5H18.25V19.25C18.25 12.25 7.75 12.25 7.75 19.25C7.75 20.4149 7.75 23.3352 7.75 24.5H4.25V14L13 5.25004L21.75 14V24.5Z"
                            fill="#323546"
                          />
                        </svg>
                      </NavLink>
                    )}
                  </li>
                  <li className="mt-1">
                    <img src={bell} alt="BellIcon" />
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="/search"
                      className={({ isActive }) =>
                        isActive ? "activeNavLink" : "navLink"
                      }
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.302 24.909L20.6574 18.2316C28.6419 5.04632 12.5581 -5.60144 3.25567 3.24709C-5.77333 13.4136 5.5307 28.4364 18.2074 20.6926L24.852 27.1895C26.7715 29.3005 29.227 26.8395 27.302 24.909ZM11.2784 3.47678C21.7731 3.47678 22.1121 19.2816 11.2784 19.2816C0.729084 19.2816 1.02987 3.47678 11.2784 3.47678Z"
                          fill="#323546"
                        />
                      </svg>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <img src={message} alt="MessageIcon" />
                  </li>
                  <li className="mt-1">
                    {profile != null || "" ? (
                      <img
                        src={profile}
                        alt="UserImage"
                        width="40px"
                        height="40px"
                        className="profile-image2"
                      />
                    ) : (
                      <img
                        src={noProfileImage}
                        alt="UserImage"
                        width="40px"
                        height="40px"
                        className="profile-image2"
                      />
                    )}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sidePanel: state.sidePanel,
});

export default connect(mapStateToProps, { logout, Toggle, cover_image })(
  SideMenu
);
