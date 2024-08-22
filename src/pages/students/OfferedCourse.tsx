import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement";

type TCourse = {
  [index: string]: any;
};
const OfferedCourse = () => {
  const { data: OfferedCourses } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();
  const modifiedObject = OfferedCourses?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
  }, {});

  const modifiedCourses = Object.values(modifiedObject);

  const handleEnroll = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };
    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedCourses.length) {
    return <p>No Available Course</p>;
  }
  return (
    <Row gutter={[0, 20]}>
      {modifiedCourses?.map((item, index) => (
        <Col style={{ border: "solid" }} span={24}>
          <h2 style={{ padding: "10px" }}>{item?.courseTitle}</h2>
          <div>
            {item?.sections?.map((section, index) => (
              <Row
                justify="space-between"
                align="middle"
                style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
              >
                <Col span={5}>section:{section.section}</Col>
                <Col span={5}>
                  days:{}
                  {section.days.map((day) => (
                    <span>{day}</span>
                  ))}
                </Col>
                <Col span={5}>Start Time:{section.startTime}</Col>
                <Col span={5}> End Time:{section.endTime}</Col>
                <Button onClick={() => handleEnroll(section._id)}>
                  Enroll
                </Button>
              </Row>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default OfferedCourse;
