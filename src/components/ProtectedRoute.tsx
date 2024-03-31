import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const ProtectedRoute = ({ children }) => {
  const cookies = new Cookies();

  const token = cookies.get('accessToken');
  console.log("🚀 ~ ProtectedRoute ~ token:", token)

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};