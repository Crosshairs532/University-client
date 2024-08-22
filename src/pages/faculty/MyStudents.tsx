import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table } from "antd";
import PHform from "../../components/form/PHform";
import PHselect from "../../components/form/PHselect";
import PHinput from "../../components/form/PHinput";
import { useState } from "react";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyData } = useGetAllFacultyCoursesQuery([
    {
      name: "semesterRegistration",
      value: registerSemesterId,
    },
    {
      name: "course",
      value: courseId,
    },
  ]);

  const tableData = facultyData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};
const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        classTest2: Number(data.classTest2),
        midTerm: Number(data.midTerm),
        finalTerm: Number(data.finalTerm),
      },
    };

    const res = await addMark(studentMark);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Faculties
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHform onSubmit={handleSubmit}>
          <PHinput type="text" name="classTest1" label="Class Test 1" />
          <PHinput type="text" name="classTest2" label="Class Test 2" />
          <PHinput type="text" name="midTerm" label="Midterm" />
          <PHinput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">submit</Button>
        </PHform>
      </Modal>
    </>
  );
};

export default MyStudents;
