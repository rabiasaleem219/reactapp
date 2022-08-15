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
import { startUpdate } from "actions/lessons";
import Spinner from "components/common/Spinner";

const EditLesson = ({ lessonId, lessons, dispatch }) => {
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
  const lesson = lessons.find((lesson) => lesson.id === lessonId);
  const { name, duration, description } = lesson;

  //** Form **/
  const INITIAL_VALUES = {
    name: name,
    duration: duration,
    description: description,
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string(),
    duration: Yup.string(),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    dispatch({
      type: types.lessonStartUpdate,
      payload: {},
    });
    const body = await startUpdate(values, lessonId);
    if (body.statusCode) {
      dispatch({
        type: types.lessonUpdateError,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      dispatch({
        type: types.lessonUpdate,
        payload: {
          id: body.id,
          name: body.name,
          duration: body.duration,
          description: body.description,
          createdAt: body.createdAt,
        },
      });
      onHide();
      Toast("success", "Clase actualizada con exito");
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
        header="Crear Categoria"
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
        <Title>EDITAR CLASE</Title>
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
              placeholder="Titulo de la clase"
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
              <Input
                id="duration"
                name="duration"
                type="text"
                placeholder="Duracion del video"
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
                placeholder="Descripcion de la clase"
                height="200px"
                editValue={description}
              />
              <InputButton
                width="22%"
                text="Agregar"
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

export default EditLesson;
