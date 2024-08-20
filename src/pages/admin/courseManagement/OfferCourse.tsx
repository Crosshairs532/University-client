import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHselect from "../../../components/form/PHselect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import PHselectWatch from "../../../components/form/PHselectWatch";
import PHinput from "../../../components/form/PHinput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: academicFacultyData } = useGetAllFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data.map((item) => {
    return {
      value: item._id,
      label: `${item.name}`,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {};
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHselectWatch
            onValueChange={setId}
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />
          <PHinput
            disabled={!id}
            type="text"
            name="test"
            label="Test"
          ></PHinput>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
