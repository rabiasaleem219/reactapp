import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import * as Yup from 'yup';

import InputButton from 'components/common/Forms/FormButton';
import { Formulario } from '../EditUser/styles';
import {
  BoxButton,
  LeftSide,
  RightSide,
} from 'pages/Profile/EditProfile/styles';
import Input from 'components/common/Forms/Inputs';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Toast from 'components/common/Popup/Toast';

const CreateUser = ({ flag }) => {
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

  //*FORMIK*
  const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const VALIDATION_SCHEMA = Yup.object().shape({
    firstName: Yup.string().required('Nombre obligatorio'),
    lastName: Yup.string().required('Apellido obligatorio'),
    username: Yup.string().required('Nombre de usuario obligatorio'),
    email: Yup.string().required('Email obligatorio'),
    password: Yup.string().required('Contraseña obligatoria'),
    confirmPassword: Yup.string()
      .required('Confirmar contraseña es obligatorio')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  });

  //* Fetch crear usuario */
  const handleSubmit = async (values) => {
    values.firstName = values.firstName.trim();
    values.lastName = values.lastName.trim();
    values.username = values.username.trim();
    values.email = values.email.trim();
    values.password = values.password.trim();
    values.confirmPassword = values.confirmPassword.trim();

    const resp = await fetchWithToken(`${endPoints.signup}`, values, 'PUT');
    const body = await resp.json();
    if (resp.status === 201) {
      onHide('displayBasic');
      flag(true);
      Toast('success', 'Usuario Creado correctamente');
    } else {
      Toast('error', `Error al Crear el usuario: ${body.message}`);
      onHide('displayBasic');
    }
  };
  return (
    <>
      <InputButton
        text="Crear usuario"
        fontSize="1rem"
        width="150px"
        heig="60px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        margin="0px 10px"
        onClick={() => onClick('displayBasic')}
      />

      <Dialog
        header="CREAR USUARIO"
        visible={displayBasic}
        style={{
          width: '60vw',
          margin: '50px 0px 0 0',
        }}
        position="center"
        contentStyle={{
          borderRadius: ' 0 0 15px 15px',
        }}
        dragg
        draggable={false}
        resizable={false}
        onHide={() => onHide('displayBasic')}
      >
        <Box sx={{}}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            <Form>
              <Formulario>
                <LeftSide>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Primer nombre"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Apellido"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Usuario"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  />
                </LeftSide>
                <RightSide>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  ></Input>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar contraseña"
                    width={'75%'}
                    heigth={'50px'}
                    margin={'10px 0px'}
                    errorPadding="0 0 0 15%"
                    backgroundColor={'#fff'}
                  ></Input>
                </RightSide>
                <BoxButton>
                  <InputButton
                    text="Crear usuario"
                    width="50%"
                    shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
                    fontSize="1rem"
                  />
                </BoxButton>
              </Formulario>
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateUser;
