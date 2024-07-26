import { ReactNode } from "react";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { NavLink } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  // if (!token) {
  //   return <NavLink to="/login" replace={true}></NavLink>;
  // }
  return children;
};

export default ProtectedRoute;
