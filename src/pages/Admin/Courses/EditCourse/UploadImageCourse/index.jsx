import { Box, Button } from "@mui/material";
import { startChecking } from "actions/auth";
import PopupError from "components/common/Popup/PopupError";
import PopupOk from "components/common/Popup/PopupOk";
import { fetchWithTokenToUploadImage } from "helpers/fetch";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "./styles";

const UploadImageCourse = (props) => {
  const dispatch = useDispatch();
  const [form_data, set_form_data] = useState();
  const [thereFile, setTherefile] = useState(false);

  const send_image = (files) => {
    const formData = new FormData();
    formData.append("image", files);
    set_form_data(formData);
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (thereFile) {
        const res = await fetchWithTokenToUploadImage(
          `/courses/courseImage/upload/${props.id}`,
          form_data,
          "PUT"
        );
        const body = await res.json();
        if (res.status === 200) {
          dispatch(startChecking());
          PopupOk("22rem", "success", "Imagen subida correctamente");
          set_form_data(null);
        } else {
          PopupError(body.message);
          set_form_data(null);
        }
      }
    };
    uploadImage();
    setTherefile(false);
  }, [thereFile]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
      }}
    >
      <form>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              send_image(e.target.files[0]);
              setTherefile(true);
            }}
          />
          <Button variant="outlined" component="span" size="small">
            Cambiar portada
          </Button>
        </label>
      </form>
    </Box>
  );
};

export default UploadImageCourse;
