import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import countryFlagAr from "../../../assets/images/png/eg.png";
import countryFlagEn from "../../../assets/images/png/en.png";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const dispatch = useDispatch();

  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 800);
  };

  useEffect(() => {
    fireLoader();
  }, [i18n.language]);

  return (
    <div className="choose-lang">
      {i18n.language === "en" && (
        <span
          className="flex gap-1 cursor-pointer"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            }),
              i18n.changeLanguage("ar");
          }}
        >
          <img src={countryFlagAr} alt="logo" className="size-9 rounded-md object-cover" />
        </span>
      )}

      {i18n.language === "ar" && (
        <span
          className="flex gap-1 cursor-pointer"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            }),
              i18n.changeLanguage("en");
          }}
        >
          <img src={countryFlagEn} alt="logo" className="size-9 rounded-md object-cover" />
        </span>
      )}
    </div>
  );
};

export default LanguageSwitch;
