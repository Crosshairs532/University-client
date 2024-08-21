import { Button, Row } from "antd";
import PHform from "../../components/form/PHform";
import PHinput from "../../components/form/PHinput";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { TResponse } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ChangePassword = () => {
  const [ChangePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await ChangePassword(data)) as TResponse<any>;
    if (res.data.success) {
      dispatch(logout());
      //   return <Navigate to={"/login"} replace={true} />;
      navigate("/login");
    } else {
      toast.error(res?.data?.error?.message);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit}>
        <PHinput type="text" name="id" label={"ID"} />
        <PHinput label="Password" type="password" name="password"></PHinput>

        <Button htmlType="submit">Login</Button>
      </PHform>
    </Row>
  );
};

export default ChangePassword;
