import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AuthPageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/auth":
        document.title = t("login_page");
        break;
      case "/auth/login":
        document.title = t("login_page");
        break;
      case "/auth/register":
        document.title = t("register_page");
        break;
      case "/auth/forgot-pass":
        document.title = t("forget_password_page");
        break;
      case "/auth/reset-pass":
        document.title = t("change_password_page");
        break;
        case "*":
        document.title = t("not_found_page");
        break;
      default:
        document.title = "Adree Dashboard";
    }
  }, [location.pathname]);
};

export default AuthPageTitle;
