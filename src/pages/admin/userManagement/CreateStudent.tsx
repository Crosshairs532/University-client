import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Row } from "antd";

const studentData = {
  password: "s@amsul@21",
  student: {
    name: {
      firstName: "John",
      middleName: "David",
      lastName: "Doe",
    },
    gender: "male",
    dateOfBirth: "2000-01-01",
    email: "john.doe@example.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    bloodGroup: "A+",
    presentAddress: "456 Elm St, City, Country",
    permanentAddress: "789 Oak St, City, Country",
    guardian: {
      fatherName: "John Doe Sr.",
      fatherOccupation: "Engineer",
      fatherContactNo: "5551234567",
      motherName: "Jane Doe",
      motherOccupation: "Doctor",
      motherContactNo: "5559876543",
    },
    localGuardian: {
      name: "Alice Smith",
      occupation: "Teacher",
      contactNo: "5557891234",
      address: "789 Oak St, City, Country",
    },
    profileImg: "https://example.com/profile.jpg",
    isActive: "active",
    academicDepartment: "665848a019a05bceec21d7a6",
    admissionSemester: "665af1e665033b43b7d67393",
  },
};
const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const formData = new FormData();

    //! for development
    formData.append("data", JSON.stringify(data));

    //! just for checking ... this will return me same object data i get from useform
    // console.log(Object.fromEntries(fromData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHform onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name" label="Name"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name" label="Name"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name" label="Name"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name" label="Name"></PHinput>
            </Col>
          </Row>

          <Button htmlType="submit">submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateStudent;
