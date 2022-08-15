import React from 'react';
import {
  ContactFormContainer,
  ContactFormInput,
  ContactFormTitle,
  ErrorMessage,
  InputTextAreaField,
  InputTextField,
  LabelText,
  FormContainer,
} from './styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '../../common/Buttons/MainButton';
import { fetchWithoutToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Toast from 'components/common/Popup/Toast';

export const ContactForm = ({ status }) => {
  const contactContext = status ? 'Soporte Educacional' : 'Soporte Técnico';

  const validationSchema = yup.object({
    name: yup.string('Ingrese su nombre').required('El nombre es requerido'),
    email: yup
      .string('Ingrese su email')
      .email('Igrese un email válido')
      .required('El email es requerido'),
    message: yup
      .string('Ingrese su mensaje')
      .min(8, 'Mensaje debe tener al menos 8 caracteres')
      .required('El mensaje es requerido'),
  });

  const { handleSubmit, values, handleChange, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        message: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const contactDto = {
          name: values.name,
          email: values.email,
          message: values.message,
          supportType: contactContext,
        };
        Toast('success', 'Mensaje enviado pronto nos comunicaremos contigo.');
        // const res = await fetchWithoutToken(
        //   `${endPoints.mail_contact}`,
        //   contactDto,
        //   'POST'
        // );

        resetForm();
      },
    });
  return (
    <>
      <ContactFormContainer>
        <ContactFormTitle>
          <h1>Contacto</h1>
        </ContactFormTitle>
        <ContactFormInput>
          <FormContainer onSubmit={handleSubmit}>
            <LabelText>Nombre</LabelText>
            <InputTextField
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <ErrorMessage>{touched.name && errors.name}</ErrorMessage>
            <LabelText>Email</LabelText>
            <InputTextField
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage>{touched.email && errors.email}</ErrorMessage>
            <LabelText>Mensaje</LabelText>
            <InputTextAreaField
              id="message"
              name="message"
              type="textarea"
              value={values.message}
              onChange={handleChange}
            />
            <ErrorMessage>{touched.message && errors.message}</ErrorMessage>
            <Button
              backgroundColor="#4B9CC2"
              text="Enviar"
              width="80%"
              padding="1rem 1rem"
              margin="1rem auto"
              alignSelf="center"
            />
          </FormContainer>
        </ContactFormInput>
      </ContactFormContainer>
    </>
  );
};
