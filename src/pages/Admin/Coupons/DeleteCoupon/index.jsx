import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import InputButton from "components/common/Forms/FormButton";
import { ButtonsContainer } from "./styles";
import { Box } from "@mui/system";
import { fetchWithToken } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import Toast from "components/common/Popup/Toast";
import { Button } from "@mui/material";

const DeleteCoupon = ({ id, flag }) => {
    //*MODAL*
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
    };
    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    };
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };
    //*Borrar usuario */
    const handleSubmit = async (id) => {
        console.log('submit');
        const resp = await fetchWithToken(
            `${endPoints.delete_coupon}/${id}`,
            {},
            "DELETE"
        );
        const data = await resp.json();
        if (data.statusCode === "200") {
            onHide("displayBasic");
            flag(true);
            Toast("success", "eliminado correctamente");
        } else {
            Toast("error", "Error al eliminar usuario");
            onHide("displayBasic");
        }
        onHide("displayBasic")
    };
    return (
        <>
            <Button size="small" onClick={() => onClick("displayBasic")}>
                <DeleteForeverIcon color="error" />
            </Button>

            <Dialog
                header="Está segura de eliminar?"
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
                <ButtonsContainer>
                    <InputButton
                        text="No"
                        backgroundColor="#90ee90"
                        backgroundColorHover="#90ee9063"
                        fontSize="1.2rem"
                        width="50px"
                        height="50px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        alignSelf="center"
                        margin="0px 20"
                        onClick={() => onHide("displayBasic")}
                    />
                    <InputButton
                        text="Si"
                        backgroundColor="#ff555b"
                        backgroundColorHover="#ff555b63"
                        fontSize="1.2rem"
                        width="70px"
                        height="70px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        alignSelf="center"
                        margin="0px 20px"
                        onClick={() => handleSubmit(id)}
                    />
                </ButtonsContainer>
            </Dialog>
        </>
    );
};

export default DeleteCoupon;
