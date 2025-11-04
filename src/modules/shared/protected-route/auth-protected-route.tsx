import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthProtectedRoute({ children }){
  const isLogged = useSelector((state) => state.auth.isLogged);

  // If the user is logged in, redirect to login
  if (isLogged) {
    return <Navigate to="/dashboard" />;
  }

  // If token not exists, render the children (the protected component)
  return children;

}

export default AuthProtectedRoute;
