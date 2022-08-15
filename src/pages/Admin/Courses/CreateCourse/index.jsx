import React from "react";
import { Formik, Form } from "formik";
import {
  Container,
  CreateCourseTitle,
  Formulario,
  LeftSide,
  RightSide,
} from "./styled";
import * as Yup from "yup";

import Input from "../../../../components/common/Forms/Inputs";
import Textarea2 from "../../../../components/common/Forms/TextArea2";

import { BoxButton } from "../../../Access/Login/style";
import InputButton from "../../../../components/common/Forms/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { startCreate } from "../../../../actions/courses";
import PopupError from "../../../../components/common/Popup/PopupError";
import PopupOk from "../../../../components/common/Popup/PopupOk";
import { useNavigate } from "react-router-dom";
import { types } from "../../../../context/types/types";
import { startChecking } from "../../../../actions/auth";
import { OneLine } from "../EditCourse/General/styles";
import Spinner from "../../../../components/common/Spinner";
import Selects2 from "components/common/Forms/Selects2";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const categoriesOptions = categories.map((category) => {
    return {
      name: category.title,
    };
  });
  const INITIAL_VALUES = {
    title: "",
    description: "",
    price: 0, //tipo number
    duration: 0, //tipo number
    category: "", //select
    level: "", //select - PRINCIPIANTE/INTERMEDIO/AVANZADO
    status: "", //select - ACTIVO/INACTIVO/BORRADOR
    premium: "", //select- yes/no - hace referencia de un booleano
    premiumPrice: 0, //tipo number
    own: "", //select -true/false
  };
  const VALIDATION_SCHEMA = Yup.object({
    title: Yup.string()
      .required("El titulo es obligatorio")
      .min(4, "El titulo debe tener al menos 4 caracteres")
      .max(50, "El titulo debe tener máximo 50 caracteres"),
    description: Yup.string().required("La descripción es obligatoria"),
    price: Yup.number().required("El precio es obligatorio"),
    // duration en formato de horas y minutos
    duration: Yup.string()
      .required("La duración es obligatoria")
      .matches(/^([0-9]{1,2})h ([0-9]{1,2})min$/, "Ejemplo: 1h 30min"),
    category: Yup.string().required("La categoria es obligatoria"),
    level: Yup.string().required("El nivel es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),
    premium: Yup.string().required("El premium es obligatorio"),
    premiumPrice: Yup.number().when("premium", {
      is: (val) => val === "true",
      then: Yup.number().required("El precio premium es obligatorio"),
    }),
    own: Yup.string().required("El propio es obligatorio"),
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values, { resetForm }) => {
    values.title = values.title.trim().toLowerCase();
    await dispatch(startChecking());
    const res = await dispatch(startCreate(values));
    if (res.type === types.coursesCreateError) {
      PopupError(res.payload);
      resetForm();
    } else {
      PopupOk("22rem", "success", "Curso creado correctamente");
      resetForm();
      navigate("/admin/courses");
    }
  };

  if (categoriesOptions === [] || categoriesOptions === undefined) {
    return <Spinner />;
  }

  return (
    <Container>
      <CreateCourseTitle>Crear curso</CreateCourseTitle>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        <Form>
          <Formulario>
            <LeftSide>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Titulo"
                margin="5px 0"
                alignItems="flex-end"
                errorPadding="0 0 0 calc(100% - 75%)"
              />
              <Selects2
                id="level"
                name="level"
                options={[
                  { name: "PRINCIPIANTE" },
                  { name: "INTERMEDIO" },
                  { name: "AVANZADO" },
                ]}
                text="Nivel"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="75%"
                errorPadding="0 0 0 calc(100% - 75%)"
              />
              <Selects2
                id="premium"
                name="premium"
                options={[{ name: "Si" }, { name: "No" }]}
                text="Premium"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="75%"
                errorPadding="0 0 0 calc(100% - 75%)"
              />

              <Selects2
                id="status"
                name="status"
                options={[
                  { name: "ACTIVO" },
                  { name: "INACTIVO" },
                  { name: "BORRADOR" },
                ]}
                text="Estado del curso"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="74%"
                errorPadding="0 0 0 calc(100% - 75%)"
              />
            </LeftSide>
            <RightSide>
              <OneLine>
                <Input
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="Duracion del curso (h min)"
                  width="100%"
                  margin="5px 0"
                  alignItems="flex-start"
                  errorPadding="0 0 0 calc(100% - 75%)"
                />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Precio"
                  margin="5px 0"
                  alignItems="flex-end"
                />
              </OneLine>
              <Selects2
                id="category"
                name="category"
                text="Categoria"
                options={categoriesOptions}
                backgroundColor="#f5f5f5"
                alignSelf="flex-start"
                width="75%"
              />
              <Input
                id="premiumPrice"
                name="premiumPrice"
                type="number"
                placeholder="Precio Premium"
                margin="5px 0"
                alignItems="flex-start"
              />
              <Selects2
                id="own"
                name="own"
                text="¿Es Propio?"
                options={[{ name: "Si" }, { name: "No" }]}
                backgroundColor="#f5f5f5"
                alignSelf="flex-start"
                width="74%"
              />
            </RightSide>
          </Formulario>
          <Textarea2
            id="description"
            name="description"
            placeholder="Descripcion del curso "
          />
          <BoxButton>
            <InputButton text="Crear Curso" width="50%" />
          </BoxButton>
        </Form>
      </Formik>
    </Container>
  );
};

export default CreateCourse;
