import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List, ListItem } from "@mui/material";
import { Button } from "components/common/Buttons/MainButton";
import { Box } from "@mui/system";

import { sortByCreateDate } from "helpers/sort";
import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";
import Spinner from "components/common/Spinner";

export const SectionAccordion = ({ section, courseTitle, isPay }) => {
  const [lessonsAndQuizzes, setLessonsAndQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLessonsAndQuizzes = async (section) => {
    const lessons = await fetchWithToken(
      `${endPoints.get_all_lessons_by_section}/${section.id}`
    );
    const bodyLessons = await lessons.json();
    const quizzes = await fetchWithToken(
      `${endPoints.get_all_quiz_by_section}/${section.id}`
    );
    const bodyQuizzes = await quizzes.json();
    if (lessons.status === 200 && quizzes.status === 200) {
      setLessonsAndQuizzes(sortByCreateDate(bodyLessons, bodyQuizzes));
      setLoading(false);
    } else {
      if (lessons.status === 200) {
        setLessonsAndQuizzes(bodyLessons);
        setLoading(false);
      } else {
        setLessonsAndQuizzes(bodyQuizzes);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getLessonsAndQuizzes(section);
  }, []);


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "100%",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Accordion
      key={section.id}
      sx={{
        border: "none",
        boxShadow: "none",
        margin: "1.2rem 0 1.5rem 0",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="h4"
          sx={{
            color: "#5e82be",
            fontSize: "2.2rem",
            "@media (max-width: 768px)": {
              fontSize: "1.2rem",
            },
          }}
        >
          {section.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            padding: "0",
          }}
        >
          {lessonsAndQuizzes.length > 0 ? (
            lessonsAndQuizzes.map((lessonOrQuiz, j) => {
              const color = j % 2 === 0 ? "#F0F0F0" : "#fff";
              const type = lessonOrQuiz.status ? "quiz" : "clase";
              return (
                <ListItem
                  key={j}
                  secondaryAction={
                    <Box
                      sx={{
                        paddingRight: "2rem",

                        "@media (max-width: 768px)": {
                          paddingRight: "0.1rem",
                        },
                      }}
                    >
                      {isPay && (
                        <Button
                          path={`/course/classroom/${courseTitle}/${type}/${lessonOrQuiz.id}`}
                          text={
                            type === "quiz"
                              ? "Entrar al Quiz"
                              : "Entrar a la clase"
                          }
                          fontSize={"0.8rem"}
                        />
                      )}
                    </Box>
                  }
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: color,
                    padding: "2rem 3rem",
                    display: "flex",
                    "@media (max-width: 768px)": {
                      padding: "2rem 0.5rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.8rem",
                      color: "#5e82be",
                      "@media (max-width: 768px)": {
                        fontSize: "1rem",
                      },
                    }}
                  >
                    {lessonOrQuiz.name}
                    <br />
                    {/* <Typography
                      sx={{
                        fontSize: '0.9rem',
                        color: '#808080',
                        width: '80%',
                        fontFamily: 'Helvetica',
                        fontWeight: '200',
                      }}
                    >
                      {parse(lessonOrQuiz.description)}
                    </Typography> */}
                  </Typography>
                </ListItem>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100px",
              }}
            >
              <Typography
                sx={{
                  color: "#808080",
                  fontFamily: "Helvetica",
                  fontWeight: "500",
                }}
              >
                No hay clases
              </Typography>
            </Box>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
