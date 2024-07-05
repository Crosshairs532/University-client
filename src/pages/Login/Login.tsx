/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" {...register("id")} />
      <input
        type="password"
        id="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
