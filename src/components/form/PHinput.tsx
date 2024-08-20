import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputprops = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHinput = ({ type, name, label, disabled }: TInputprops) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} htmlFor={name}>
            <Input
              disabled={disabled}
              type={type}
              id={name}
              size="large"
              {...field}
            />
            {error && <small>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHinput;
