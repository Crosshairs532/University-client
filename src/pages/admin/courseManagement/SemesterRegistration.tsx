import { semesterOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHselect from "../../../components/form/PHselect";
import PHinput from "../../../components/form/PHinput";
import PHDatePicker from "../../../components/form/PHDatePicker";

import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();

  const { data: academicSemester } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  const academicSemesterOptions = academicSemester?.map((item) => ({
    value: item.id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit = async (data) => {
    const toastId = toast.loading("creating...");
    console.log("submitted", data);
    console.log(data);
    const semData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };

    try {
      const res = (await addSemester(semData)) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res.error.status, { id: toastId });
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
        <PHform onSubmit={onSubmit}>
          <PHselect name="status" label="Status" options={semesterOptions} />
          <PHselect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />

          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHinput type="text" name="minCredit" label="Min Credit"></PHinput>
          <PHinput type="text" name="maxCredit" label="Max Credit"></PHinput>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
