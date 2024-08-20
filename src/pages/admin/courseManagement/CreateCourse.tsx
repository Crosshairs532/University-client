import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHselect from "../../../components/form/PHselect";
import PHinput from "../../../components/form/PHinput";

import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const preRequisiteCoursesOptions = courses?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    console.log("submitted", data);
    console.log(data);
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.creadits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(courseData)) as unknown as TResponse<any>;
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
          <PHinput type="text" name="title" label="Title"></PHinput>
          <PHinput type="text" name="prefix" label="Prefix"></PHinput>
          <PHinput type="text" name="code" label="Code"></PHinput>
          <PHselect
            mode="multiple"
            name="preRequisiteCourses"
            label="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
