import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type DataType = Pick<TStudent, "name" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TParam | any>([]);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery(params);
  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "10%",
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action == "filter") {
      const queryParam: TParam[] = [];
      filters.name?.forEach((filter) =>
        queryParam.push({
          name: "name",
          value: filter,
        })
      );
      filters.year?.forEach((filter) =>
        queryParam.push({
          name: "year",
          value: filter,
        })
      );

      setParams(queryParam);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default StudentData;
