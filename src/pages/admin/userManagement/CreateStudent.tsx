import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Divider, Row } from "antd";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHselect from "../../../components/form/PHselect";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";

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
  const { data, isLoading } = useGetAllSemestersQuery(undefined);
  const { data: dData, isLoading: isdLoading } = useGetAcademicDepartmentsQuery(
    undefined,
    {
      skip: isLoading,
    }
  );

  const semesterOptions = data?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}- ${item.year}`,
  }));

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
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name.firstName" label="Name"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="name.middleName"
                label="Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name.lastName" label="Name"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="gender" label="Gender"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dataOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="bloodGroup"
                label="Blood Group"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="email" label="Email"></PHinput>
            </Col>

            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="contactNo"
                label="Contact Number"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="presentAddress"
                label="Present Address"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              ></PHinput>
            </Col>
            <Divider>Guardian</Divider>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.fatherOccupation
"
                label="Fathers's Occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.fatherContactNo
"
                label="Father ContactNo"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.motherName"
                label="Mother's Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.motherOccupation
"
                label="Mother Occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              ></PHinput>
            </Col>

            <Divider>Local Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="localGuardian.name"
                label="Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="localGuardian.address"
                label="Address"
              ></PHinput>
            </Col>

            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHselect
                name="admissionSemester"
                label="Admission Semester"
                disabled={isLoading}
                options={semesterOptions}
              ></PHselect>
            </Col>
          </Row>

          <Button htmlType="submit">submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateStudent;
