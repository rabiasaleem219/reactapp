import React, { useEffect, useReducer, useState } from "react";
import { Dialog } from "primereact/dialog";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Box } from "@mui/material";
import { Dropdown } from "primereact/dropdown";
import MultiSelect from "../FormsQuestions/MultiSelect";
import TrueFalse from "../FormsQuestions/TrueFalse";
import {
  initialState,
  questionReducer,
} from "context/quizzesQuestion/questionReducer";
import { types } from "context/types/types";
import { startFetchQuestions } from "actions/question";
import GetAllQuestions from "../GetAllQuestions";

const ModalQuestionAnswer = ({ quizId }) => {
  //** Modal **/
  const [display, setDisplay] = useState(false);
  const onClick = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };

  //** Opcion seleccionada **/
  const [selected, setSelected] = useState(null);

  const onOptionChange = (e) => {
    setSelected(e.value);
  };

  //*Reducer quizQuestion
  const [questions, dispatch] = useReducer(questionReducer, initialState);
  const [flag, setFlag] = useState(true);

  //*Get all Questions
  useEffect(() => {
    const getAllQuestions = async () => {
      if (flag) {
        dispatch({
          type: types.questionStartFetch,
          payload: {},
        });
        const body = await startFetchQuestions(quizId);
        if (body.statusCode) {
          dispatch({
            type: types.questionFetchError,
            payload: {},
          });
        } else {
          dispatch({
            type: types.questionFetch,
            payload: body,
          });
        }
      }
    };
    getAllQuestions();
    setFlag(false);
  }, [flag]);

  const optionsItems = [
    { label: "Verdadero y Falso", value: 1 },
    { label: "Seleccion Multiple", value: 2 },
  ];
  return (
    <>
      <button
        onClick={() => onClick("displayBasic")}
        style={{
          margin: "0px",
          padding: "0px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <FactCheckIcon color="primary" />
      </button>

      <Dialog
        header="Crear preguntas del Quiz"
        visible={display}
        style={{ width: "50vw", height: "60vh" }}
        onHide={() => onHide("displayBasic")}
        draggable={false}
        resizable={false}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px", margin: "10px 0px" }}>
            Selecciona el tipo de pregunta que deseas crear:
          </span>

          <Dropdown
            value={selected}
            options={optionsItems}
            onChange={onOptionChange}
            showClear={true}
            placeholder="Elija una opcion"
          />
          <Box
            sx={{
              margin: "5px 0px",
              width: "100%",
              padding: "0px",
            }}
          >
            {selected === 1 && (
              <TrueFalse
                dispatch={dispatch}
                quizId={quizId}
                setSelected={setSelected}
                setFlag={setFlag}
              />
            )}
            {selected === 2 && (
              <MultiSelect
                dispatch={dispatch}
                quizId={quizId}
                setSelected={setSelected}
                setFlag={setFlag}
              />
            )}
            {!selected &&
              questions.questions.map((item, i) => {
                return (
                  <GetAllQuestions
                    key={item.id}
                    questions={item}
                    dispatch={dispatch}
                    quizId={quizId}
                    i={i}
                  />
                );
              })}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalQuestionAnswer;
