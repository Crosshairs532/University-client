import { Button, Col, Flex } from "antd";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import PHform from "../../components/form/PHform";
import PHselect from "../../components/form/PHselect";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemesterRegistration._id}${item.academicSemesterRegistration.year}`,
    value: item.semesterRegistration._id,
  }));
  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));
  const onSubmit = (data) => {};
  return (
    <Flex gap="large">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHselect
            options={semesterOptions}
            name="SemesterRegistration"
            label="Semester Registration"
          />
          <PHselect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default MyCourses;
