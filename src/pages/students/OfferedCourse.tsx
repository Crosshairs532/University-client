import { useGetAllOfferedCoursesQuery } from "../../redux/features/admin/studentCourseManagement";

const OfferedCourse = () => {
  const { data: OfferedCourses } = useGetAllOfferedCoursesQuery(undefined);

  const modifiedObject = OfferedCourses.reduce((acc, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
    });
  }, {});

  return <div></div>;
};

export default OfferedCourse;
