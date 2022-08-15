import { Box, Container, Pagination, Typography } from "@mui/material";
import Spinner from "components/common/Spinner";
import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";
import { useEffect, useState } from "react";

const Students = (props) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const getStudentsByCourse = async () => {
      setLoading(true);
      const response = await fetchWithToken(
        `${endPoints.get_students_by_course}/${props.courseId}`
      );
      const body = await response.json();
      console.log("Body", body);
      if (response.status === 200) {
        setStudents(body);
        setLoading(false);
      } else {
        setStudents([]);
        setLoading(false);
      }
    };
    getStudentsByCourse();
  }, []);

  //*Paginacion
  const [page, setPage] = useState(1); //pagina actual
  const n = 9; //Numero de elementos por paginas
  const totalPages = Math.ceil(students.length / n) + 1; //total de paginas

  const handleChange = (event, value) => {
    setPage(value);
  };
  //*Funcion para listar los usuarios por pagina
  const setitemsInPage = () => {
    let pagination = {};
    let j = 0;
    for (let i = 1; i <= totalPages; i++) {
      pagination[i] = students.slice(j * n, j * n + n);
      j++;
    }

    return pagination;
  };
  const itemList = setitemsInPage();

  if (loading) {
    return (
      <div
        style={{
          width: "200px",
          height: "200px",
        }}
      >
        cargando...
      </div>
    );
  }

  return (
    <Container
      sx={{
        padding: "2rem 0",
        height: "70%",
      }}
    >
      {/* //* header del historial de compras */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography sx={{ width: "25%", flexShrink: 0 }}>ID</Typography>
        <Typography sx={{ width: "25%", flexShrink: 0 }}>Nombre</Typography>
        <Typography sx={{ width: "25%", flexShrink: 0 }}>Correo</Typography>
        <Typography sx={{ width: "25%", flexShrink: 0 }}>Usuario</Typography>
      </Box>

      {/* //* Contenido del historial de compras */}
      <Box
        sx={{
          margin: "1.5rem 0rem",
          height: "70%",
        }}
      >
        {itemList[page].map((item, i) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "1rem 0rem",
              }}
            >
              <Typography sx={{ width: "25%", flexShrink: 0 }}>
                {item.id.substring(item.id.length - 4, item.id.length)}
              </Typography>
              <Typography sx={{ width: "25%", flexShrink: 0 }}>
                {item.firstName} {item.lastName}
              </Typography>
              <Typography sx={{ width: "25%", flexShrink: 0 }}>
                {item.email}
              </Typography>
              <Typography sx={{ width: "25%", flexShrink: 0 }}>
                {item.username}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <Pagination
          count={totalPages - 1}
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
};

export default Students;
