import { Layout, Menu } from "antd";
import sidebarGenerator from "../../utils/sidebarGenerator";
import { adminPath } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
export const Siderbar = () => {
  const role = "admin";
  let sideBarItems;

  switch (role) {
    case userRole.ADMIN:
      sideBarItems = sidebarGenerator(adminPath, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideBarItems = sidebarGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sideBarItems = sidebarGenerator(studentPaths, userRole.STUDENT);
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          border: "solid 2px white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <h1>BRACU</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems}
      />
    </Sider>
  );
};

export default Sider;
