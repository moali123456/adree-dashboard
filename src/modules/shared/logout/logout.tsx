import { logout } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";

const LogOut = ({ logoutContent }) => {
  const dispatch = useDispatch();

  const logoutBtn = () => {
    dispatch(logout());
  };

  return (
    <>
      <span className="cursor-pointer flex gap-2 items-center" onClick={logoutBtn}>
        {logoutContent?.photo} <span className={logoutContent.textStyle}>{logoutContent?.text}</span>
      </span>
    </>
  );
};

export default LogOut;
