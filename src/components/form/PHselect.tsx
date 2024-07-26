import { Form, Select, Space } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; desabled?: boolean }[];
};

const PHselect = ({ label, name, options }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item layout="vertical" label={label}>
          <Select style={{ width: "100%" }} {...field} options={options} />
          {error && <small>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHselect;
