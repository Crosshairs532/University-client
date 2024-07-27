import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import options from "../../../constants/semester";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHselect from "../../../components/form/PHselect";

import { academicSemesterSchema } from "../../../schema/academicSemesterSchema";
import { TResponse } from "../../../types/global";
import { monthOptions } from "../../../constants/global";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 5].map((number) => ({
  value: String(number + currentYear),
  label: String(number + currentYear),
}));

const CreateAcademicSemester = () => {
  const [academicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    console.log("submitted", data);
    const name = options[Number(data?.name) - 1]?.label;
    console.log(data);
    const semData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semData);

    try {
      const res = (await academicSemester(semData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("semester created", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform
          resolver={zodResolver(academicSemesterSchema)}
          onSubmit={onSubmit}
        >
          <PHselect name="name" label="Name" options={options}></PHselect>
          <PHselect name="year" label="Year" options={yearOptions}></PHselect>
          <PHselect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          ></PHselect>
          <PHselect
            name="endMonth"
            label="End Month"
            options={monthOptions}
          ></PHselect>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
