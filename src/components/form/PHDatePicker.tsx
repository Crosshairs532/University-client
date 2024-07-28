import { DatePicker, Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker style={{ width: "100%" }} {...field} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
