import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "../stores/authStore";

const ProtectedRoute = ({
  isAllowed,
  children,
}: {
  isAllowed: boolean;
  children?: React.ReactNode;
}) => {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAllowed) return <Navigate to="/not-allowed" replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
