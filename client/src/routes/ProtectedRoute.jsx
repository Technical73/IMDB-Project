import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axiosConfig";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
