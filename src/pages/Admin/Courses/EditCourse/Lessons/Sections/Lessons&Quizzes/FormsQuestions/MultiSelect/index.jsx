import { Box, Button, Container } from "@mui/material";
import Input2 from "components/common/Forms/Input2/InputItem";
import React, { useEffect, useState } from "react";
import { Form } from "./styles";
import * as Yup from "yup";
import { formatYupErrors } from "helpers/formatYupErrors";
import { types } from "context/types/types";
import { startCreate } from "actions/question";
import Toast from "components/common/Popup/Toast";

const MultiSelect = (props) => {
  //** Formulario **/
  //Estado del formulario
  const [values, setValues] = useState(
    props.data ?? { question: "", options: [], type: "opcionMultiple" }
  );
  const [error, setError] = useState(null);
  //Estado inicial de cada opcion de la pregunta
  const initialOptionState = {
    title: "",
    isCorrect: false,
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //añadir nueva opcion de respuesta
  const addOption = () => {
    setValues({ ...values, options: [...values.options, initialOptionState] });
  };

  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const optionToEdit = values.options;
    if (name === "isCorrect") {
      optionToEdit.forEach((option, idx) => {
        if (idx !== index) {
          option.isCorrect = false;
        }
      });
      optionToEdit[index] = {
        ...optionToEdit[index],
        [name]: value === "true",
      };
    } else {
      optionToEdit[index] = {
        ...optionToEdit[index],
        [name]: value,
      };
    }
    setValues({ ...values, options: optionToEdit });
  };

  //** Validaciones del formulario
  const validationSchema = Yup.object().shape({
    question: Yup.string()
      .required("La pregunta es requerida")
      .min(5, "debe tener al menos 5 caracteres"),
    options: Yup.array()
      .required("Las opciones son requeridas")
      .min(2, "Debe tener al menos dos opciones"),
  });

  useEffect(() => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => setError(null))
      .catch((err) => {
        setError(err);
      });
  }, [values]);

  const verifyOptions = () => {
    return values.options.find((option) => {
      return option.title === "";
    });
  };

  const verifyOptionChecked = () => {
    return values.options.find((option) => {
      return option.isCorrect === true;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error === null) {
      props.dispatch({
        type: types.questionStartCreate,
        payload: {},
      });
      const body = await startCreate(values, props.quizId);
      if (body.statusCode) {
        props.dispatch({
          type: types.questionCreateError,
          payload: body.message,
        });
        Toast("error", body.message);
      } else {
        props.dispatch({
          type: types.questionCreateSuccess,
          payload: values,
        });
        Toast("success", body.message);
        props.setSelected(null);
        props.setFlag(true);
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Input2
          name="question"
          placeholder="Pregunta"
          value={values.question}
          onChange={handleQuestionChange}
          errors={error?.inner}
        />
        {!props.data ? (
          <Button color="primary" variant="contained" onClick={addOption}>
            Agregar Respuesta
          </Button>
        ) : null}
        <Box>
          {values.options.map((item, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 0px",
                }}
              >
                <Input2
                  name="title"
                  placeholder="Opcion"
                  value={item.title}
                  onChange={(e) => handleOptionChange(e, i)}
                  margin="0px"
                />
                <input
                  name="isCorrect"
                  type="radio"
                  placeholder="Correcto"
                  value={true}
                  onChange={(e) => handleOptionChange(e, i)}
                  checked={item.isCorrect}
                />
              </Box>
            );
          })}

          {error && formatYupErrors(error.inner, "options") && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {formatYupErrors(error.inner, "options").message}
            </span>
          )}
        </Box>
        {!props.data ? (
          <Button
            sx={{ margin: "10px 0px" }}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !values.question || !!verifyOptions() || !verifyOptionChecked()
            }
          >
            Añadir pregunta
          </Button>
        ) : null}
      </Form>
    </Container>
  );
};

export default MultiSelect;
