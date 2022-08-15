import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { types } from "context/types/types";
import { MainButton } from "components/common/Buttons/MainButton/styles";
import Input from "components/common/Forms/Inputs/";
import InputButton from "components/common/Forms/FormButton";
import { startCreate } from "actions/sections";
import { useDispatch } from "react-redux";
import { startChecking } from "actions/auth";
import Toast from "components/common/Popup/Toast";

const ModalFormSection = ({ dispatch, courseId }) => {
  //*** Modal */
  const [display, setDisplay] = useState(false);
  const onClick = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };

  //** Form */
  const INITIAL_VALUES = {
    name: "",
  };
  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string().required("El nombre de la seccion es obligatorio"),
  });
  //handleSubmit stuff
  const authdispatch = useDispatch();
  const handleSubmit = async (values) => {
    // values.name = values.name.trim().toLowerCase();
    await authdispatch(startChecking());
    dispatch({
      type: types.sectionStartCreate,
      payload: {},
    });
    const body = await startCreate(values, courseId);
    if (body.statusCode) {
      dispatch({
        type: types.sectionErrorCreate,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      dispatch({
        type: types.sectionCreate,
        payload: {
          id: body.id,
          name: body.name,
          createdAt: body.createdAt,
        },
      });
      Toast("success", "Seccion creada con exito");
      setDisplay(false);
    }

    // setDisplay(false);
  };

  return (
    <>
      <MainButton
        shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
        onClick={() => {
          onClick();
        }}
      >
        Agregar Seccion
      </MainButton>

      <Dialog
        header="Titulo de la seccion"
        visible={display}
        contentStyle={{ borderRadius: " 0 0 10px 10px" }}
        style={{ width: "50vw" }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre de la seccion"
                margin={"0 0 0.9rem 0"}
                errorPadding="0 0 0 calc(100% - 80%)"
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

export default ModalFormSection;
