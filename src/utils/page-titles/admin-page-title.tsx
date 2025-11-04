import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AdminPageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        document.title = t("pages_titles.dashboard_page");
        break;
        case "/products":
        document.title = t("pages_titles.products");
        break;
      case "*":
        document.title = t("Adree Dashboard");
        break;
      default:
        document.title = "Adree Dashboard";
    }
  }, [location.pathname]);

};

export default AdminPageTitle;
