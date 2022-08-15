import { Box } from "@mui/material";
import InputButton from "components/common/Forms/FormButton";
import Input from "components/common/Forms/Inputs";
import Textarea2 from "components/common/Forms/TextArea2";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import { types } from "context/types/types";
import { startCreate } from "actions/lessons";
import Toast from "components/common/Popup/Toast";

const Formlessons = ({ sectionId, setDisplay, dispatch }) => {
  //***Form */
  const INITIAL_VALUES = {
    name: "",
    duration: 0,
    description: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    duration: Yup.string().required("La duracion es requerida"),
    description: Yup.string().required("La descripcion es requerida"),
  });

  const handledSubmit = async (values) => {
    dispatch({
      type: types.lessonStartCreate,
      payload: {},
    });
    const body = await startCreate(values, sectionId);
    if (body.statusCode) {
      dispatch({
        type: types.lessonCreateError,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      dispatch({
        type: types.lessonCreate,
        payload: {
          id: body.id,
          name: body.name,
          duration: body.duration,
          description: body.description,
          createdAt: body.createdAt,
        },
      });
      Toast("success", "Clase creada con exito");
      setDisplay(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handledSubmit}
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
    </>
  );
};

export default Formlessons;
