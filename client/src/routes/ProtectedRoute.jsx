import { Navigate } from "react-router-dom";
import cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  let token = cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
