/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import PHform from "../../components/form/PHform";
import PHinput from "../../components/form/PHinput";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const [login, { error }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const id = toast.loading("logging in");

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged in", { id: id, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("something went wrong");
    }
  };
  const defaultValues = {
    id: "admin",
    password: "admin",
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHinput type="text" name="id" label={"ID"} />
        <PHinput label="Password" type="password" name="password"></PHinput>
        {errors.password && <span>This field is required</span>}

        <Button htmlType="submit">Login</Button>
      </PHform>
    </Row>
  );
};

export default Login;
