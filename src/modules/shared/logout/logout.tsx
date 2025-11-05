import type { ReactNode } from "react";

interface LogoutContent {
  photo?: ReactNode;
  text?: string;
  textStyle?: string;
}

interface LogOutProps {
  logoutContent: LogoutContent;
}

const LogOut = ({ logoutContent }: LogOutProps) => {
  //const dispatch = useDispatch();

  const logoutBtn = () => {
    //dispatch(logout());
  };

  return (
    <>
      <span className="cursor-pointer flex gap-2 items-center" onClick={logoutBtn}>
        {logoutContent?.photo} <span className={logoutContent?.textStyle}>{logoutContent?.text}</span>
      </span>
    </>
  );
};

export default LogOut;