import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHselect = ({ label, name, options }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item htmlFor={name} layout="vertical" label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            id={name}
            options={options}
          />
          {error && <small>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHselect;
