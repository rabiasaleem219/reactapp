import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Button } from "../../../components/common/Buttons/MainButton";
import {
  ButtonContainer,
  ButtonsContainer,
  CardContainer,
  Container,
} from "./style";

import { AdminCourseItem } from "./CourseItem";
import { useSelector } from "react-redux";
import Spinner from "../../../components/common/Spinner";
import CreateCategory from "./CreateCategory";

const Courses = () => {
  const { courses, loading } = useSelector((state) => state.courses);

  // sort courses by date
  const sortedCourses = courses
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .reverse();

  return (
    <Container>
      <ButtonsContainer>
        <ButtonContainer>
          <Button path="/admin/courses/create" text="Crear curso" />
        </ButtonContainer>
        <CreateCategory />
      </ButtonsContainer>
      {courses.length === 0 && !loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#a0a0a0",
          }}
        >
          <h1>No hay cursos registrados</h1>
        </Box>
      ) : null}
      {loading ? (
        <Spinner />
      ) : (
        <CardContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {sortedCourses.map((data) => (
              <AdminCourseItem key={data.id} {...data} />
            ))}
          </Box>
        </CardContainer>
      )}
    </Container>
  );
};

export default Courses;
