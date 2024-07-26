import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";

import PHselect from "../../../components/form/PHselect";
import options from "../../../constants/semester";
import { monthOPtions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 5].map((number) => ({
  value: String(number + currentYear),
  label: String(number + currentYear),
}));

const createAcademicSemester = () => {
  const [academicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
      const res = await academicSemester(semData);
      console.log(res);
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
            options={monthOPtions}
          ></PHselect>
          <PHselect
            name="endMonth"
            label="End Month"
            options={monthOPtions}
          ></PHselect>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default createAcademicSemester;
