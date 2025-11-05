import { useSelector } from "react-redux";
import Images from "../../../assets/images/images";

const MainLoader = () => {
  const isLoading = useSelector((state: { mainLoader: { isLoading: boolean } }) => 
    state.mainLoader.isLoading
  );

  return isLoading ? (
    <div className="loader-spinner-bx">
      <img className="w-[200px]" src={Images.loader1} alt="pic" />
    </div>
  ) : null;
};

export default MainLoader;