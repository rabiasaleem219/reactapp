import { useEffect, useReducer, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import ModalForm from "./Lessons&Quizzes/ModalForm";
import {
  initialStateLessons,
  lessonsReducer,
} from "context/courseLessons/lessonsReducer";
import {
  initialStateQuizzes,
  quizReducer,
} from "context/courseQuizzes/quizzesReducer";
import { startFetchLessons } from "actions/lessons";
import { types } from "context/types/types";
import { startFetchQuizzes } from "actions/quizzes";
import { startDelete } from "actions/sections";
import { sortByCreateDate } from "helpers/sort";
import EditLesson from "./Lessons&Quizzes/EditLesson";
import Deletelesson from "./Lessons&Quizzes/DeleteLesson";
import UploadLesson from "./Lessons&Quizzes/UploadLesson";
import EditQuiz from "./Lessons&Quizzes/EditQuiz";
import DeleteQuiz from "./Lessons&Quizzes/DeleteQuiz";
import ModalQuestionAnswer from "./Lessons&Quizzes/ModalQuestionAnswer";
import EditSection from "./EditSection/EditSection";
import UploadResources from "./Lessons&Quizzes/UploadResources";

const Sections = ({ i, text, sectionId, dispatchSection }) => {
  //!acordeon stuff**
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => (event, isExpanded) => {
    setExpanded(isExpanded ? true : false);
  };

  //!Lessons & Quizzes stuff**
  //?Lessons reducer
  const [lessons, dispatchLessons] = useReducer(
    lessonsReducer,
    initialStateLessons
  );
  //? Quizzes reducer
  const [quizzes, dispatchQuizzes] = useReducer(
    quizReducer,
    initialStateQuizzes
  );
  //? SortItems Variable
  let sortItems = [];
  useEffect(() => {
    //fetch LESSONS
    const fetchLessons = async () => {
      dispatchLessons({ type: types.lessonStartFetch, payload: {} });
      const body = await startFetchLessons(sectionId);
      if (body.statusCode) {
        dispatchLessons({
          type: types.lessonFetchError,
          payload: body.message,
        });
      } else {
        dispatchLessons({ type: types.lessonFetch, payload: body });
      }
    };
    //fetch QUIZZES
    const fetchQuizzes = async () => {
      dispatchQuizzes({ type: types.quizStartFetch, payload: {} });
      const body = await startFetchQuizzes(sectionId);
      if (body.statusCode) {
        dispatchQuizzes({
          type: types.quizFetchError,
          payload: body.message,
        });
      } else {
        dispatchQuizzes({ type: types.quizFetch, payload: body });
      }
    };

    if (expanded) {
      fetchLessons();
      fetchQuizzes();
    }
  }, [expanded]);

  //! Borrar Secciones **//
  const handleDelete = async () => {
    dispatchSection({ type: types.sectionStartDelete, payload: {} });
    const body = await startDelete(sectionId);
    if (body.statusCode !== 200) {
      dispatchSection({
        type: types.sectionDeleteError,
        payload: body.message,
      });
    } else {
      dispatchSection({ type: types.sectionDelete, payload: sectionId });
    }
  };

  //! SortItems **//
  if (lessons.lessons.length !== 0 || quizzes.quizzes.length !== 0) {
    // Ordenamos los lessons y quizzes en un solo array
    sortItems = sortByCreateDate(lessons.lessons, quizzes.quizzes);
  }

  return (
    <div>
      {/* //? Inicio del acordeon de la seccion */}
      <Accordion expanded={expanded} onChange={handleChange()} square={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* //* Numero de la seccion */}
            <Typography sx={{ width: "33%", flexShrink: 0 }}>#{i}</Typography>
            {/* //* Nombre de la seccion */}
            <Typography
              sx={{ width: "33%", color: "text.secondary", flexShrink: 0 }}
            >
              {text}
            </Typography>
            {/* //*Boton de editar Seccion */}
            <EditSection
              sectionId={sectionId}
              dispatchSection={dispatchSection}
            />
            {/* //*Boton de borrar Seccion */}
            <Button
              variant="outlined"
              sx={{ width: "10%", flexShrink: 0 }}
              color="error"
              onClick={handleDelete}
            >
              Borrar
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#757373",
            }}
          >
            <span>Presione el boton para agregar una clase o quiz</span>
          </Box>
          {/* Boton crear clase/quiz  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ModalForm
              sectionId={sectionId}
              dispatchLessons={dispatchLessons}
              dispatchQuizzes={dispatchQuizzes}
            />
          </Box>

          {/* //?   AQUI VAMOS A IMPRIMIR TODAS LAS CLASES  */}
          {sortItems.length === 0 ? (
            <span> No hay nada para mostrar para mostrar </span>
          ) : (
            sortItems.map((item, i) => {
              // ? Si es un Quiz
              if (item.status) {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "#F0F0F0",
                      margin: "10px 0px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span
                        style={{
                          margin: "0 50px 0 0",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                        }}
                      >
                        Quiz
                      </span>
                      <span>{item.name}</span>
                    </div>

                    <div
                      style={{
                        width: "50%",
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span>
                        {/* //*Preguntas del Quiz */}
                        <ModalQuestionAnswer quizId={item.id} />
                      </span>
                      <span style={{ margin: "0 8px " }}>
                        <EditQuiz
                          quizId={item.id}
                          quizzes={quizzes.quizzes}
                          dispatch={dispatchQuizzes}
                        />
                      </span>
                      <span>
                        <DeleteQuiz
                          quizId={item.id}
                          dispatch={dispatchQuizzes}
                        />
                      </span>
                    </div>
                  </div>
                );
              } else {
                // ? Si es una Clase
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      margin: "5px 0px",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span
                        style={{
                          margin: "0 50px 0 0",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                        }}
                      >
                        Clase
                      </span>
                      <span>{item.name}</span>
                    </div>

                    <div
                      style={{
                        width: "50%",
                        flexShrink: 0,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {/* //*Subir video de la clase */}
                      <span>{<UploadLesson lessonId={item.id} />}</span>
                      <span>{<UploadResources lessonId={item.id} />}</span>
                      <span
                        style={{
                          margin: "0 8px",
                        }}
                      >
                        {
                          <EditLesson
                            lessonId={item.id}
                            lessons={lessons.lessons}
                            dispatch={dispatchLessons}
                          />
                        }
                      </span>
                      <span>
                        <Deletelesson
                          lessonId={item.id}
                          dispatch={dispatchLessons}
                        />
                      </span>
                    </div>
                  </div>
                );
              }
            })
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Sections;
