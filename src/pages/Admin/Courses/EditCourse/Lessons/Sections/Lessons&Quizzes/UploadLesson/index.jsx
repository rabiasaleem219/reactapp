import React from "react";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Dialog } from "primereact/dialog";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { ClipLoader } from "react-spinners";

import { FormContainer, UploadButton } from "pages/Profile/UploadImage/styles";
import { fetchWithTokenToUploadImage } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import Toast from "components/common/Popup/Toast";

const UploadLesson = ({ lessonId }) => {
  //*** Modal */
  const [display, setDisplay] = useState(false);
  const onClick = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };

  //*** input para subir archivo */
  const Input = styled("input")({
    display: "none",
  });
  //**para contener el archivo */
  const [form_data, set_form_data] = useState();
  const [thereFile, setTherefile] = useState(false);
  const [loading, setLoading] = useState(false);

  const send_image = (files) => {
    const formData = new FormData();
    formData.append("video", files);
    set_form_data(formData);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(form_data, 'here form_data');
    const res = await fetchWithTokenToUploadImage(
      `${endPoints.upload_video}/${lessonId}`,
      form_data,
      "PUT"
    );
    const body = await res.json();
    if (res.status === 200) {
      setTherefile(false);
      Toast("success", "Vídeo subido con éxito");
      set_form_data(null);
      setDisplay(false);
    } else {
      Toast("error", body.message);
      set_form_data(null);
      setTherefile(false);
    }
    setLoading(false);
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
        <FileUploadIcon color="primary" />
      </button>

      <Dialog
        header="Subir vide de la clase"
        visible={display}
        contentStyle={{ borderRadius: " 0 0 10px 10px", overflow: "hidden" }}
        style={{ width: "65vw" }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormContainer onSubmit={handleSubmit}>
            <label htmlFor="icon-button-file">
              <Input
                accept="video/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  send_image(e.target.files[0]);
                  setTherefile(true);
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload video  "
                component="span"
                sx={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  color: "#757575",
                  marginBottom: "0.6rem",
                }}
              >
                <VideoLibraryIcon />
              </IconButton>
              {loading && <ClipLoader color={"black"} size={30} />}
              <UploadButton>
                {!thereFile ? (
                  <Button
                    sx={{
                      color: "#707070 !important",
                      backgroundColor: "#cbcbcb !important",
                    }}
                    disabled
                  >
                    Subir video
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "loeading..." : "Subir video de la clase"}
                  </Button>
                )}
              </UploadButton>
            </label>
          </FormContainer>
        </Box>
      </Dialog>
    </>
  );
};

export default UploadLesson;
