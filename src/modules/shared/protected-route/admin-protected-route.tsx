import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoute({ children }) {
  const isLogged = useSelector((state) => state.auth.isLogged);

  // If the user is not logged in, redirect to login
  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (the protected component)
  return children;
}

export default AdminProtectedRoute;
