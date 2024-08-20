import { Button, Table, Modal, TableColumnsType } from "antd";

import { TSemester } from "../../../types";
import { useState } from "react";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHform from "../../../components/form/PHform";
import PHselect from "../../../components/form/PHselect";

export type DataType = Pick<TSemester, "status" | "startDate" | "endDate">;

const Courses = () => {
  const {
    data: courses,
    isFetching,
    isLoading,
  } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data.map(({ _id, title, prefix, code }) => {
    return {
      key: _id,
      title,
      code: `${title}${code}`,
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (item) => {
        return <AddFacultyModal facultydata={item} />;
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};
const AddFacultyModal = ({ facultydata }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);
  const [addFaculty] = useAddFacultiesMutation();

  const facultyOptions = facultyData?.data.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultydata.key,
      data,
    };

    addFaculty(facultyData);
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
          <PHselect
            mode="multiple"
            options={facultyOptions}
            name="faculties"
            label="Faculty"
          ></PHselect>
          <Button htmlType="submit">submit</Button>
        </PHform>
      </Modal>
    </>
  );
};

export default Courses;
