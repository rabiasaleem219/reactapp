import { InputItem } from "../Inputs/styles";
import React from "react";
import { Box } from "@mui/material";
import { formatYupErrors } from "helpers/formatYupErrors";

const Input2 = (props) => {
  return (
    <>
      <InputItem {...props} />
      <Box
        sx={{
          color: "red",
          fontSize: "12px",
        }}
      >
        {props.errors && formatYupErrors(props.errors, props.name) && (
          <span> {formatYupErrors(props.errors, props.name).message} </span>
        )}
      </Box>
    </>
  );
};

export default Input2;
