import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import InputButton from "components/common/Forms/FormButton";

import { Box } from "@mui/system";
import { types } from "context/types/types";
import Toast from "components/common/Popup/Toast";
import { startDelete } from "actions/lessons";
import { ButtonsContainer } from "pages/Admin/Users/DeleteUser/styles";

const Deletelesson = ({ lessonId, dispatch }) => {
  //*MODAL*
  const [displayBasic, setDisplayBasic] = useState(false);

  const onClick = (name) => {
    setDisplayBasic(true);
  };
  const onHide = (name) => {
    setDisplayBasic(false);
  };
  //*Borrar usuario */
  const handleSubmit = async () => {
    dispatch({
      type: types.lessonStartDelete,
      payload: {},
    });
    const body = await startDelete(lessonId);
    console.log(body);
    if (body.statusCode !== 200) {
      dispatch({
        type: types.lessonDeleteError,
        payload: body.message,
      });
      Toast("error", body.message);
      onHide();
    } else {
      dispatch({
        type: types.lessonDelete,
        payload: lessonId,
      });
      Toast("success", body.message);
      onHide();
    }
  };
  return (
    <>
      <button
        onClick={() => onClick()}
        style={{
          margin: "0px",
          padding: "0px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <DeleteForeverIcon color="error" />
      </button>

      <Dialog
        header="Borrar clase"
        visible={displayBasic}
        style={{ width: "50vw", boxShadow: "none" }}
        onHide={() => onHide()}
        position="center"
        contentStyle={{
          borderRadius: "0 0 15px 15px",
        }}
        draggable={false}
        resizable={false}
      >
        <Box
          sx={{ textAlign: "center", margin: "30px 0px", fontSize: "1.2rem" }}
        >
          <p>¿Estas seguro de eliminar esta clase?</p>
        </Box>

        <ButtonsContainer>
          <InputButton
            text="Si"
            backgroundColor="#ff555b"
            backgroundColorHover="#ff555b63"
            fontSize="1.2rem"
            width="50px"
            height="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignSelf="center"
            margin="0px 10px"
            onClick={() => handleSubmit()}
          />
          <InputButton
            text="No"
            backgroundColor="#ff555b"
            backgroundColorHover="#ff555b63"
            fontSize="1.2rem"
            width="50px"
            height="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignSelf="center"
            margin="0px 10px"
            onClick={() => onHide()}
          />
        </ButtonsContainer>
      </Dialog>
    </>
  );
};

export default Deletelesson;
