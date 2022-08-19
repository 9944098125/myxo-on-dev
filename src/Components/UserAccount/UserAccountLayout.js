import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const UserAccountLayout = (props) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default UserAccountLayout;
