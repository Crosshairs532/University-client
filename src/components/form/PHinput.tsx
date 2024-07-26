import { Form } from "antd";
import { Controller } from "react-hook-form";

type TInputprops = {
  type: string;
  name: string;
  label?: string;
};
const PHinput = ({ type, name, label }: TInputprops) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ fieldState: { error } }) => (
          <Form.Item label={label}>
            <input type={type} id={name} />
            {error && <small>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHinput;
