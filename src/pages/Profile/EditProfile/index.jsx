import { Formik, Form } from 'formik';

import { BoxButton, Formulario, LeftSide, RightSide } from './styles';
import Input from '../../../components/common/Forms/Inputs/';
import { useDispatch, useSelector } from 'react-redux';
import InputButton from '../../../components/common/Forms/FormButton';

import { countries } from '../../../const/countries';
import { fetchWithToken } from '../../../helpers/fetch';
import { endPoints } from '../../../const/endPoints';
import { startChecking } from '../../../actions/auth';
import PopupOk from '../../../components/common/Popup/PopupOk';
import PopupError from '../../../components/common/Popup/PopupError';
import Selects2 from 'components/common/Forms/Selects2';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { firstName, lastName, username, email, country, gender, phone, ci } =
    user;

  const initialValues = {
    firstName,
    lastName,
    username,
    email,
    country,
    gender,
    phone,
    ci,
  };

  const handleSubmit = async (values) => {
    dispatch(startChecking());
    const updatedUser = await fetchWithToken(
      endPoints.update_user,
      values,
      'PUT'
    );
    const data = await updatedUser.json();
    if (updatedUser.status === 200) {
      PopupOk('22rem', 'success', 'Perfil actualizado');
      dispatch(startChecking());
    } else {
      PopupError(data.message);
    }
  };

  //  ** "firstName": "string22",
  //   **"lastName": "string",
  //   **"username": "strin2g",
  //   **"email": "user2@example.com",
  //   **"country": "string",
  //   **"gender": "string",
  //   **"phone": null,
  //   **"ci": null
  //   "image": "false",

  return (
    <>
      <h1>Edita tu perfil </h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
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
                width={'90%'}
                heigth={'50px'}
                margin={'10px 0px'}
                errorPadding="0 0 0 15%"
                backgroundColor={'#fff'}
              />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Segundo nombre"
                width={'90%'}
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
                width={'90%'}
                heigth={'50px'}
                margin={'10px 0px'}
                errorPadding="0 0 0 15%"
                backgroundColor={'#fff'}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                width={'90%'}
                heigth={'50px'}
                margin={'10px 0px'}
                errorPadding="0 0 0 15%"
                backgroundColor={'#fff'}
              />
            </LeftSide>
            <RightSide>
              {/* Estados */}
              <Selects2
                id="country"
                name="country"
                width={'85%'}
                options={countries}
                previousValue={country}
                text="Estado"
              />
              {/***** GENERO  ******/}

              <Selects2
                id="gender"
                name="gender"
                options={[
                  { name: 'Hombre' },
                  { name: 'Mujer' },
                  { name: 'Otro' },
                ]}
                width={'85%'}
                text="Sexo"
              />

              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Número de teléfono"
                width={'90%'}
                heigth={'50px'}
                margin={'10px 0px'}
                errorPadding="0 0 0 15%"
                backgroundColor={'#fff'}
              ></Input>
              <Input
                id="ci"
                name="ci"
                type="string"
                placeholder="Cédula de identidad"
                width={'90%'}
                heigth={'50px'}
                margin={'10px 0px'}
                errorPadding="0 0 0 15%"
                backgroundColor={'#fff'}
              ></Input>
            </RightSide>
            <BoxButton>
              <InputButton
                text="Actualizar información"
                width="50%"
                shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
              />
            </BoxButton>
          </Formulario>
        </Form>
      </Formik>
    </>
  );
};
