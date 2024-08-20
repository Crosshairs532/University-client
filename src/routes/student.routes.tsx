import MySchedule from "../pages/students/MySchedule";
import OfferedCourse from "../pages/students/OfferedCourse";
import StudentDashboard from "../pages/students/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
