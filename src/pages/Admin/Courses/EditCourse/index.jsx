import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import {
  Container,
  ImgContainer,
  MenuContainer,
  NavbarContainer,
  ShadowContainer,
  TileContainer,
} from "./style";
import imgDefault from "../../../../assets/images/course-image.png";
import General from "./General";
import { useParams } from "react-router-dom";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import { useSelector } from "react-redux";
import UploadImageCourse from "./UploadImageCourse";
import { BASE_URL, endPoints } from "const/endPoints";
import Students from "./Students";
import ViewComments from "components/layout/CourseTab/Comments/ViewComments";

const EditCourse = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const courseTitle = useParams().courseTitle;
  const cleanCourseTitle = courseTitle && courseTitle.replaceAll("-", " ");
  const cleanTitle = cleanCourseTitle
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  //Obtener Id del curso
  const courses = useSelector((state) => state.courses.courses);

  const course =
    courses && courses.find((course) => course.title === cleanCourseTitle);
  //⬆️⬆️⬆️id del curso en cuestion
  const id = course && course.id;

  return (
    <Container>
      <h1>Edicion de curso</h1>
      <ShadowContainer>
        <ImgContainer>
          <UploadImageCourse id={id} />
          <img
            // src={
            //   course.image
            //     ? `${BASE_URL}${endPoints.get_course_image}/${course.image}`
            //     : imgDefault
            // }
            alt="imagen del curso"
          />
          <TileContainer>
            <h1>
              Curso <br /> {cleanTitle}
            </h1>
          </TileContainer>
        </ImgContainer>
        <NavbarContainer>
          <MenuContainer>
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="General" headerStyle={{}}>
                <General />
              </TabPanel>
              <TabPanel header="Profesores">
                <Teachers />
              </TabPanel>
              <TabPanel header="Clases">
                <Lessons courseId={id} />
              </TabPanel>
              <TabPanel header="Alumnos">
                <Students courseId={id} />
              </TabPanel>
              <TabPanel header="Comentarios">
                <ViewComments courseId={id} oldComments={false} />
              </TabPanel>
            </TabView>
          </MenuContainer>
        </NavbarContainer>
      </ShadowContainer>
    </Container>
  );
};

export default EditCourse;
