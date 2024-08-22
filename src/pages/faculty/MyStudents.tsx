import { useParams } from "react-router-dom";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import { Button, Table } from "antd";

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

  const tableData = facultyData?.data?.map(({ _id, student }) => ({
    key: _id,
    name: student.fullName,
    roll: student.id,
  }));
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
      render: () => {
        return (
          <div>
            <Button>update</Button>
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

export default MyStudents;
