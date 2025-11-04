import { useSelector } from "react-redux";
import Images from "../../../assets/images/images";
// import Lottie from "lottie-react";
// import loader1 from "../../../../assets/Images/json/loader1.json";

const MainLoader = () => {
  const isLoading = useSelector((state) => state.mainLoader.isLoading);

  return isLoading ? (
    <div className="loader-spinner-bx">
      {/* <Lottie animationData={loader1} loop={true} /> */}
      <img className="w-[200px]" src={Images.loader1} alt="pic" />
    </div>
  ) : null;
};

export default MainLoader;
