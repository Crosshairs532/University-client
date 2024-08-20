import { Button, Dropdown, Space, Table, TableColumnsType, Tag } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import moment from "moment";
import { TSemester } from "../../../types";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUpdateSemesterMutation } from "../../../redux/features/admin/courseManagement";

export type DataType = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
  {
    label: "UPCOMING",
    key: "upcoming",
  },
  {
    label: "ONGOING",
    key: "ongoing",
  },
  {
    label: "ENDED",
    key: "ended",
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState();

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(undefined);
  const [updateSemester] = useUpdateSemesterMutation();
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );
  const handleUpdate = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateSemester(updateData);
  };

  const menuProps = {
    items,
    onClick: handleUpdate,
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (item) => {
        return (
          <Dropdown trigger={["click"]} menu={menuProps}>
            <Button onClick={() => setSemesterId(item.key)}>
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default RegisteredSemesters;
