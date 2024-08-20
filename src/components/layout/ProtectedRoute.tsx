import { ReactNode } from "react";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <NavLink to="/login" replace={true}></NavLink>;
  }

  // if (!token) {
  //   return <NavLink to="/login" replace={true}></NavLink>;
  // }
  return children;
};

export default ProtectedRoute;
