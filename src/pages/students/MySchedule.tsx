import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement";

const MySchedule = () => {
  const { data } = useGetAllOfferedCoursesQuery(undefined);
  return (
    <div>
      {data?.data?.map((item) => {
        return (
          <div>
            {data?.data?.map((item) => {
              return (
                <div>
                  <div>{item.course.title}</div>
                  <div>{item.offeredCourse.section}</div>
                  <div>
                    {item.offeredCourse.days.map((item) => (
                      <span> {item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;
