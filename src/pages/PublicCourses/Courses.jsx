import { CourseItem } from "components/layout/CourseItem";
import React from "react";
import { useSelector } from "react-redux";
import { BackgroundNavbar } from "../../components/common/BackgroundNavbar";
import { MenuBar } from "../../components/common/MenuBar";
import Resize from "../../helpers/Resize";
import { Courses, CoursesContainer, TitleContainer } from "./styles";

const PublicCourses = () => {
  const width = Resize();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  return (
    <>
      <BackgroundNavbar />
      {user && width > 920 ? <MenuBar /> : null}
      <CoursesContainer>
        <TitleContainer>
          <h1> Cursos </h1>

          <Courses>
            {courses.map((course) => {
              const { id, title, price, numberOfStudents, duration, level } =
                course;
              return (
                <CourseItem
                  key={course.id}
                  title={title}
                  price={price}
                  numberOfStudents={numberOfStudents}
                  duration={duration}
                  level={level}
                  id={id}
                  backgroundColor="#fff"
                  image={course.image}
                />
              );
            })}
          </Courses>
        </TitleContainer>
      </CoursesContainer>
    </>
  );
};

export default PublicCourses;
