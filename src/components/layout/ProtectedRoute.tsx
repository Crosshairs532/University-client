import { ReactNode } from "react";
import {
  logout,
  selectCurrentUser,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../utils/verifyToken";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector(useCurrentToken);

  // ! we will not do this  as from redux persist one can easily acces admin
  // const user = useAppSelector(selectCurrentUser);

  // * we will verifytoken
  let user;

  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useDispatch();

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <NavLink to="/login" replace={true}></NavLink>;
  }

  // if (!token) {
  //   return <NavLink to="/login" replace={true}></NavLink>;
  // }
  return children;
};

export default ProtectedRoute;
