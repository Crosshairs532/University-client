import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { error }] = useLoginMutation();

  const onSubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
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
