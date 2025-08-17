import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  isLoggedIn,
  children,
}: {
  isAllowed: boolean;
  isLoggedIn: boolean;
  children?: React.ReactNode;
}) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAllowed) return <Navigate to="/not-allowed" replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
