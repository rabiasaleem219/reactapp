import { Box, Button } from "@mui/material";
import { startUpdate } from "actions/sections";
import InputButton from "components/common/Forms/FormButton";
import Input2 from "components/common/Forms/Input2/InputItem";
import Toast from "components/common/Popup/Toast";
import { types } from "context/types/types";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const EditSection = ({ sectionId, dispatchSection }) => {
  const [display, setDisplay] = useState(false);

  const onClick = () => {
    setDisplay(true);
  };

  const onHide = () => {
    setDisplay(false);
    setValues({ name: "" });
  };

  //!Formulario de edicion de seccion
  const [values, setValues] = useState({ name: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //!Edit Lessons
  const handleEdit = async (e) => {
    e.preventDefault();
    dispatchSection({ type: types.sectionStartUpdate, payload: {} });
    const body = await startUpdate(values, sectionId);
    console.log(body);
    if (body.statusCode) {
      dispatchSection({
        type: types.sectionUpdateError,
        payload: body.message,
      });
      Toast("error", body.message);
    } else {
      dispatchSection({ type: types.sectionUpdate, payload: body });
      Toast("success", "Seccion Editada con exito");
      setDisplay(false);
    }
  };
  return (
    <>
      <Button
        onClick={() => onClick()}
        sx={{ width: "10%", flexShrink: 0 }}
        variant="outlined"
      >
        Editar
      </Button>
      <Dialog
        header="Editar Nombre de la Seccion"
        visible={display}
        style={{ width: "40vw" }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleEdit}
          >
            <Input2
              name="name"
              placeholder="Nombre de la seccion"
              value={values.name}
              onChange={handleChange}
              margin="0"
            />
            <InputButton text="Cambiar Nombre" />
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default EditSection;
