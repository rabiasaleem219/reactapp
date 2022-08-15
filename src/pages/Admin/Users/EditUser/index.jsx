import React, { useState } from "react";
import { MainButton } from "components/common/Buttons/MainButton/styles";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { Title } from "pages/Admin/Courses/CreateCategory/styles";
import { ButtonContainer } from "pages/Admin/Courses/style";
import { Form, Formik } from "formik";
import Input from "components/common/Forms/Inputs";
import InputButton from "components/common/Forms/FormButton";
import { Container, Formulario, Modal } from "./styles";
import {
  BoxButton,
  LeftSide,
  RightSide,
} from "pages/Profile/EditProfile/styles";
import { fetchWithToken } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import Toast from "components/common/Popup/Toast";
import Selects2 from "components/common/Forms/Selects2";
import { countries } from "const/countries";
import { Button } from "@mui/material";

const EditUser = ({ user, flag }) => {
  //!! Modal ****/
  const [visible, setVisible] = useState(false);

  const click = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  const onHide = () => {
    setVisible(false);
  };
  //!! FORMULARIO ****/

  const INITIAL_VALUES = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    ci: user.ci,
    country: user.country,
    gender: user.gender,
    role: user.role,
  };
  //**** VALIDATION SCHEMA ****/
  const VALIDATION_SCHEMA = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    username: Yup.string(),
    email: Yup.string(),
    ci: Yup.string(),
  });

  const onSubmit = async (values) => {
    const resp = await fetchWithToken(
      `${endPoints.update_any_user}/${user.id}`,
      values,
      "PUT"
    );
    const data = await resp.json();

    if (data === 200) {
      Toast("success", "Usuario actualizado correctamente");
      flag(true);
    } else {
      Toast("error", data.message);
    }
  };

  return (
    <>
      <Button size="small" onClick={() => click()}>
        <EditIcon color="success" />
      </Button>

      <Modal>
        <Dialog
          header="Crear Categoria"
          visible={visible}
          style={{
            width: "60vw",
            margin: "50px 0px 0 0",
          }}
          position="center"
          contentStyle={{
            borderRadius: "15px",
          }}
          draggable={false}
          showHeader={false}
          resizable={false}
          className="dialog"
          onHide={() => onHide()}
        >
          <ButtonContainer>
            <MainButton
              backgroundColor="rgb(255, 255, 255)"
              backgroundColorHover="rgb(7, 7, 7, 0.1)"
              height="32px"
              width=" 32px"
              padding="5px 0 0 0"
              margin="1rem 0rem 0rem 0rem"
              color="#292929"
              onClick={() => close()}
            >
              <CloseIcon />
            </MainButton>
          </ButtonContainer>
          <Title>EDITAR USUARIO</Title>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={onSubmit}
          >
            <Form>
              <Formulario>
                <LeftSide>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Primer nombre"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Segundo nombre"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Usuario"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  />
                </LeftSide>
                <RightSide>
                  <Selects2
                    id="country"
                    name="country"
                    options={countries}
                    previousValue={user.country}
                    text="Estado"
                  />
                  <Selects2
                    id="gender"
                    name="gender"
                    options={[
                      { name: "Hombre" },
                      { name: "Mujer" },
                      { name: "Otro" },
                    ]}
                    previousValue={user.gender}
                    text="Sexo"
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Número de teléfono"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  ></Input>
                  <Input
                    id="ci"
                    name="ci"
                    type="string"
                    placeholder="Cédula de identidad"
                    width={"75%"}
                    heigth={"50px"}
                    margin={"10px 0px"}
                    errorPadding="0 0 0 15%"
                    backgroundColor={"#fff"}
                  ></Input>
                </RightSide>
                <Selects2
                  id="role"
                  name="role"
                  options={[
                    { name: "estudiante" },
                    { name: "profesor" },
                    { name: "admin" },
                  ]}
                  text="Tipo de usuario"
                />
                <BoxButton>
                  <InputButton
                    text="Actualizar información"
                    width="50%"
                    shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
                    fontSize="1rem"
                  />
                </BoxButton>
              </Formulario>
            </Form>
          </Formik>
        </Dialog>
      </Modal>
    </>
  );
};

export default EditUser;
