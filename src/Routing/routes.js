import { Route, Routes } from "react-router-dom";
import TrainerRegister from "../Components/TrainerRegistration/TrainerRegistration";
import Login from "../Components/Login/Login";
import Account from "../Components/Account/Account";
import Registration from "../Components/Registration/Registration";
import TrainerProfile from "../Components/TrainerHomePage/trainerHomePage";
import SidebarLayout from "../Components/SidePanel/SideMenuLayout";
import ImageUpload from "../Components/imageUpload/imageUpload";
import TrainerSettings from "../Components/TrainerSettings/TrainerSettings";
import TrainerFinance from "../Components/Trainer-finance/trainerFinance";
import { UserProfile } from "../Components/userProfile/userProfile";
import TrainerAccountLayout from "../Components/TrainerAccount/TrainerAccountLayout";
import Search from "../Components/Search/search";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import TrainerAccount from '../Components/TrainerAccount/TrainerAccount';
import UserAccount from '../Components/UserAccount/UserAccount';
import UserAccountLayout from '../Components/UserAccount/UserAccountLayout';
import LiveStream from "../Components/Live_stream/live_stream";

const BaseRoutes = () => {
  return (
    <>
      <Routes mode="absolute">
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/trainer-registration" element={<TrainerRegister />} />
        <Route path="/registration" element={<Registration />} />
        {/* live stream */}
        <Route path="/stream/:class_id" element={< LiveStream />} />
        {/* common component - sidebar */}
        <Route element={<SidebarLayout />}>
          {/* trainer routes */}
          <Route path="/trainer-profile" element={<TrainerProfile />} />
          <Route path="/account" element={<Account />} />

          <Route path="/trainer-account" element={<TrainerAccountLayout />}>
            <Route path="imageUpload/:id" element={<ImageUpload />} />
            <Route index element={<TrainerAccount />} />
          </Route>
          <Route path="/settings" element={<TrainerSettings />} />
          <Route path="/finance" element={<TrainerFinance />} />
          {/* user routes */}
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          {/* user-routes */}
          <Route path="/user-account" element={<UserAccountLayout />}>
            <Route path="imageUpload/:id" element={<ImageUpload />} />
            <Route index element={<UserAccount />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default BaseRoutes;
