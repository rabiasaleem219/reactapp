import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import InputButton from "components/common/Forms/FormButton";

import { Box } from "@mui/system";
import { types } from "context/types/types";
import Toast from "components/common/Popup/Toast";
import { startDelete } from "actions/quizzes";
import { ButtonsContainer } from "pages/Admin/Users/DeleteUser/styles";

const DeleteQuiz = ({ quizId, dispatch }) => {
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
      type: types.quizStartDelete,
      payload: {},
    });
    const body = await startDelete(quizId);
    console.log(body);
    if (body.statusCode !== 200) {
      dispatch({
        type: types.quizDeleteError,
        payload: body.message,
      });
      Toast("error", body.message);
      onHide();
    } else {
      dispatch({
        type: types.quizDelete,
        payload: quizId,
      });
      onHide();
      Toast("success", body.message);
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
        header="Borrar Quiz"
        visible={displayBasic}
        style={{ width: "50vw", boxShadow: "none" }}
        onHide={() => onHide("displayBasic")}
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
          <p>¿Estas seguro de eliminar este quiz?</p>
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
            onClick={() => onHide("displayBasic")}
          />
        </ButtonsContainer>
      </Dialog>
    </>
  );
};

export default DeleteQuiz;
