import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../../utils/page-titles/auth-page-title";
import MainLoader from "../../shared/loaders/main-loader";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import "./auth-layout.scss";

const AuthLayout = () => {
  // Auth page titles
  AuthPageTitle();

  const dispatch = useDispatch();

  // fire loader
  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 800);
  };

  useEffect(() => {
    fireLoader();
  }, []);

  return (
    <div id="auth-layout" className="bg-white min-h-dvh p-3">
      {/* Loader */}
      <MainLoader />

      {/* Pages */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
