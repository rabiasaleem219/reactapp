import React from "react";
import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { styled } from "@mui/material/styles";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FormContainer, UploadButton } from "pages/Profile/UploadImage/styles";
import { fetchWithTokenToUploadImage } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import Toast from "components/common/Popup/Toast";
import { ClipLoader } from "react-spinners";

const UploadResources = ({ lessonId }) => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [form_data, set_form_data] = useState()
    const [loading, setLoading] = useState(false);

    //*** Modal */
    const [display, setDisplay] = useState(false);
    const onClick = () => {
        setDisplay(true);
    };
    const onHide = () => {
        setDisplay(false);
        set_form_data(undefined);
        setUploadedFiles([])
    };


    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
        })
        const formData = new FormData();
        for (const file of uploaded) {
            formData.append('files', file);
        }
        set_form_data(formData);
        setUploadedFiles(uploaded)
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        console.log("Submit", form_data, uploadedFiles);
        e.preventDefault();
        const res = await fetchWithTokenToUploadImage(
            `${endPoints.updoad_resource}/${lessonId}`,
            form_data,
            "PUT"
        );
        const body = await res.json();
        console.log(body);
        if (res.status === 200) {
            Toast("success", "Imagen subida correctamente");
            set_form_data(null);
            setUploadedFiles([]);
            setDisplay(false);
        } else {
            Toast("error", body.message);
            set_form_data(null);
            setUploadedFiles([]);
            setDisplay(false);
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
                <AttachFileIcon />
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
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" component="label">
                                    Choose Files
                                    <input hidden id='fileUpload' type='file' multiple
                                        accept='*'
                                        onChange={handleFileEvent}
                                    />
                                </Button>
                                <label htmlFor='fileUpload'>
                                    <a > {uploadedFiles.length === 0 ? "No files selected" : "Uploaded files"}</a>
                                </label>

                                <div className="uploaded-files-list">
                                    {uploadedFiles.map(file => (
                                        <div key={file.name}>
                                            {file.name}
                                        </div>
                                    ))}
                                </div>
                            </label>
                            {loading && <ClipLoader color={"black"} size={30} />}
                            <Button onClick={handleSubmit} disabled={loading || uploadedFiles.length === 0}>
                                {loading ? "loeading..." : "Upload Files"}
                            </Button>
                        </Stack>
                    </FormContainer>
                </Box>
            </Dialog>
        </>
    );
};

export default UploadResources;
