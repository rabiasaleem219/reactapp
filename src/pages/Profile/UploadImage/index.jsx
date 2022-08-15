import React, { useState } from "react";
import { endPoints } from "../../../const/endPoints";
import { fetchWithTokenToUploadImage } from "../../../helpers/fetch";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { FormContainer, UploadButton } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../../../actions/auth";
import PopupOk from "../../../components/common/Popup/PopupOk";
import PopupError from "../../../components/common/Popup/PopupError";

const Input = styled("input")({
  display: "none",
});

export const UploadImage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [form_data, set_form_data] = useState();
  const [thereFile, setTherefile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchWithTokenToUploadImage(
      endPoints.upload_profile_image,
      form_data,
      "PUT"
    );
    const body = await res.json();
    if (res.status === 200) {
      dispatch(startChecking());
      setTherefile(false);
      PopupOk("22rem", "success", "Imagen subida correctamente");
      set_form_data(null);
    } else {
      PopupError(body.message);
      set_form_data(null);
      setTherefile(false);
    }
  };

  const send_image = (files) => {
    const formData = new FormData();
    formData.append("image", files);
    set_form_data(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => {
            send_image(e.target.files[0]);
            setTherefile(true);
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{
            backgroundImage: `url(${user.profileImageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "#757575",
            marginBottom: "0.6rem",
          }}
        >
          <PhotoCamera />
        </IconButton>
        <UploadButton>
          {!thereFile ? (
            <Button
              sx={{
                color: "#707070 !important",
                backgroundColor: "#cbcbcb !important",
              }}
              disabled
            >
              Cambiar foto de perfil
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Cambiar foto de perfil</Button>
          )}
        </UploadButton>
      </label>
    </FormContainer>
  );
};
