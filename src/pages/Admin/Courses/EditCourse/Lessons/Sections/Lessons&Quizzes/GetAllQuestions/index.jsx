import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import MultiSelect from "../FormsQuestions/MultiSelect";
import TrueFalse from "../FormsQuestions/TrueFalse";
import { startDelete } from "actions/question";
import { types } from "context/types/types";
import Spinner from "components/common/Spinner";
import { Box, Button, Typography } from "@mui/material";

const GetAllQuestions = ({ questions, dispatch, quizId, i }) => {
  //!acordeon stuff**
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => (event, isExpanded) => {
    setExpanded(isExpanded ? true : false);
  };

  //! Borrar Secciones **//
  const handleDelete = async () => {
    dispatch({ type: types.questionStartDelete, payload: {} });
    const body = await startDelete(questions.id);
    console.log(body);
    if (body.statusCode !== 200) {
      dispatch({
        type: types.questionDeleteError,
        payload: body.message,
      });
    } else {
      dispatch({ type: types.questionDelete, payload: questions.id });
    }
  };
  if (questions.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange()}>
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

            {/* //*Boton de borrar Seccion */}
            <Button
              sx={{ width: "10%", flexShrink: 0 }}
              color="error"
              onClick={handleDelete}
            >
              Borrar
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {questions.type === "opcionMultiple" ? (
            <MultiSelect data={questions} />
          ) : (
            <TrueFalse data={questions} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GetAllQuestions;
