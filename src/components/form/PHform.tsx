import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TOnsubmit = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues: { id: string; password: string };
  resolver?: any;
};

type TfromConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const PHform = ({ resolver, onSubmit, children, defaultValues }: TOnsubmit) => {
  const formConfig: TfromConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHform;
