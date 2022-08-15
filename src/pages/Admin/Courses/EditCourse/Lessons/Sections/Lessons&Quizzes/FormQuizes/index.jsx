import React from "react";
import { Formik, Form } from "formik";
import { Box } from "@mui/system";
import * as Yup from "yup";

import Input from "components/common/Forms/Inputs";
import Selects2 from "components/common/Forms/Selects2";
import Textarea2 from "components/common/Forms/TextArea2";
import InputButton from "components/common/Forms/FormButton";
import { types } from "context/types/types";
import { startCreate } from "actions/quizzes";
import Toast from "components/common/Popup/Toast";

const FormQuizes = ({ sectionId, setDisplay, dispatch }) => {
  //***Form */
  const INITIAL_VALUES = {
    name: "",
    status: "",
    duration: 0,
    description: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    status: Yup.string().required("El estado es requerido"),
    duration: Yup.number().required("La duracion es requerida"),
    description: Yup.string().required("La descripcion es requerida"),
  });
  const handledSubmit = async (values) => {
    dispatch({
      type: types.quizStartCreate,
      payload: {},
    });
    const body = await startCreate(values, sectionId);
    if (body.statusCode) {
      dispatch({
        type: types.quizCreateError,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      dispatch({
        type: types.quizCreate,
        payload: {
          id: body.id,
          name: body.name,
          status: body.status,
          duration: body.duration,
          description: body.description,
          createdAt: body.createdAt,
        },
      });
      Toast("success", "Quiz creado con exito");
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

export default FormQuizes;
