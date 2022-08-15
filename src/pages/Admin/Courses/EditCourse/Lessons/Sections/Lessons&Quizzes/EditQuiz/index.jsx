import React, { useState } from "react";
import { MainButton } from "components/common/Buttons/MainButton/styles";
import { Dialog } from "primereact/dialog";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { Title } from "pages/Admin/Courses/CreateCategory/styles";
import { ButtonContainer } from "pages/Admin/Courses/style";
import Input from "components/common/Forms/Inputs";
import InputButton from "components/common/Forms/FormButton";
import Textarea2 from "components/common/Forms/TextArea2";

import { types } from "context/types/types";

import Toast from "components/common/Popup/Toast";
import Selects2 from "components/common/Forms/Selects2";
import { startUpdate } from "actions/quizzes";

const EditQuiz = ({ quizId, quizzes, dispatch }) => {
  //!! Modal ****/
  const [visible, setVisible] = useState(false);

  const click = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  const onHide = () => {
    setVisible(false);
  };

  //!! FORMULARIO ****/

  //**** Obtenemos los datos anteriores ****/
  const quiz = quizzes.find((quiz) => quiz.id === quizId);
  const { name, status, duration, description } = quiz;

  //** Form **/
  const INITIAL_VALUES = {
    name: name,
    status: status,
    duration: duration,
    description: description,
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string(),
    status: Yup.string(),
    duration: Yup.number(),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    dispatch({
      type: types.quizStartUpdate,
      payload: {},
    });
    const body = await startUpdate(values, quizId);
    if (body.statusCode) {
      console.log("Error");
      dispatch({
        type: types.quizUpdateError,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      console.log("Apunto de salir");
      dispatch({
        type: types.quizUpdate,
        payload: {
          id: body.id,
          name: body.name,
          status: body.status,
          duration: body.duration,
          description: body.description,
          createdAt: body.createdAt,
        },
      });
      onHide();
      Toast("success", "Quiz actualizado con exito");
    }
  };

  return (
    <>
      <button
        onClick={() => click()}
        style={{
          margin: "0px",
          padding: "0px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <EditIcon color="success" />
      </button>

      <Dialog
        header="Editar Quiz"
        visible={visible}
        style={{
          width: "60vw",
          margin: "50px 0px 0 0",
        }}
        position="center"
        contentStyle={{
          borderRadius: "15px",
        }}
        draggable={false}
        showHeader={false}
        resizable={false}
        className="dialog"
        onHide={() => onHide()}
      >
        <ButtonContainer>
          <MainButton
            backgroundColor="rgb(255, 255, 255)"
            backgroundColorHover="rgb(7, 7, 7, 0.1)"
            height="32px"
            width=" 32px"
            padding="5px 0 0 0"
            margin="1rem 0rem 0rem 0rem"
            color="#292929"
            onClick={() => close()}
          >
            <CloseIcon />
          </MainButton>
        </ButtonContainer>
        <Title>EDITAR QUIZ</Title>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre del Quiz"
              errorPadding="0 0 0 calc(100% - 85%)"
            />
            {/* Select e input uno al lado de otro */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Selects2
                id="status"
                name="status"
                text="Estado del Quiz"
                options={[{ name: "Activo" }, { name: "Inactivo" }]}
                backgroundColor="#f5f5f5"
                width="240px"
                margin="0 0px"
                previousValue={status}
              />
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="Duracion del examen"
                width="150px"
                margin="0 0px "
              />
            </Box>
            {/* Editor de texto y Boton */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Textarea2
                id="description"
                name="description"
                placeholder="Descripcion del Quiz"
                height="200px"
                editValue={description}
              />
              <InputButton
                width="22%"
                text="Editar"
                display="flex"
                justifyContent="center"
                alignItems="center"
                shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
              />
            </Box>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
};

export default EditQuiz;
