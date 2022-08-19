import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const TrainerAccountLayout = (props) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default TrainerAccountLayout;
