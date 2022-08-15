import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "components/common/Buttons/MainButton";
import Spinner from "components/common/Spinner";
import React from "react";

export const ConfirmQuiz = ({ setConfirm, quiz }) => {
  const handleClick = () => {
    setConfirm(true);
  };

  return (
    <Box
      sx={{
        paddingTop: "2rem",
      }}
    >
      {quiz ? (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#737373",
              textAlign: "center",
            }}
            variant="h4"
          >
            ¿Seguro que desea iniciar el Quiz?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "1.2rem",
              color: "#737373",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Al momento de iniciar tendras {quiz.duration} minutos para terminar
            el Quiz.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button margin="1rem" text={"Volver atras"} path={-1} />
            <Button
              margin="1rem"
              text={"Iniciar el Quiz"}
              click={handleClick}
            />
          </Box>
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};
