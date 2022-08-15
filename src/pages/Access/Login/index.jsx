import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/common/Forms/Inputs';
import * as Yup from 'yup';

import {
  Container,
  Formulario,
  Box,
  Divider,
  BoxButton,
  BoxOptions,
  NavButtonContainer,
} from './style';
import InputButton from '../../../components/common/Forms/FormButton';

import { startLogin } from '../../../actions/auth';
import { Button } from '../../../components/common/Buttons/MainButton';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    userOrEmail: '',
    password: '',
  };

  const validationSchema = Yup.object({
    userOrEmail: Yup.string()
      .required('El usuario o Email es obligatorio')
      .min(4, 'El usuario o Email debe tener al menos 4 caracteres')
      .max(50, 'El usuario o Email debe tener máximo 50 caracteres'),
    password: Yup.string()
      .min(6, 'la contraseña debe tener al menos 6 caracteres')
      .max(20, 'la contraseña debe tener máximo 20 caracteres')
      .required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { userOrEmail, password } = values;
    const userData = {
      userOrEmail: userOrEmail.trim(),
      password,
    };
    dispatch(startLogin(userData.userOrEmail, userData.password));
    !!user ? navigate('/profile') : navigate('/access/login');
    resetForm();
  };

  return (
    <Container>
      <h1>Iniciar sesión</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Formulario>
            <Input
              id="userOrEmail"
              name="userOrEmail"
              type="text"
              placeholder="Usuario o Email"
              margin="5px 0"
              errorPadding="0 0 0 15%"
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              errorPadding="0 0 0 15%"
            ></Input>

            <Box>
              <BoxButton>
                <InputButton text="Iniciar Sesión" width="70%" />
              </BoxButton>
              <BoxOptions>
                <NavButtonContainer
                  color="#797979"
                  fontSize="1.2rem"
                  fontWeight="300"
                >
                  <Link to="/access/register">Registrate</Link>
                </NavButtonContainer>
                <Divider />
                <NavButtonContainer
                  color="#797979"
                  fontSize="1.2rem"
                  fontWeight="300"
                >
                  <Link to="*">Olvidé mi contraseña</Link>
                </NavButtonContainer>
              </BoxOptions>
            </Box>
          </Formulario>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
