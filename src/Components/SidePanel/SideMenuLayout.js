import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { Fragment } from "react";

const SidebarLayout = (props) => {
  return (
    <Fragment>
      <SideMenu />
      <Outlet />
    </Fragment>
  );
};

export default SidebarLayout;
