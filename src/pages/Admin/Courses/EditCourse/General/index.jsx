import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { types } from "../../../../../context/types/types";
import InputButton from "../../../../../components/common/Forms/FormButton";
import Input from "../../../../../components/common/Forms/Inputs";
import Textarea2 from "../../../../../components/common/Forms/TextArea2";
import { BoxButton } from "../../../../Access/Login/style";
import { Formulario, LeftSide, RightSide } from "../../CreateCourse/styled";
import { Container, OneLine } from "./styles";
import Spinner from "../../../../../components/common/Spinner";
import { startChecking } from "../../../../../actions/auth";
import { startUpdate } from "../../../../../actions/courses";
import PopupError from "../../../../../components/common/Popup/PopupError";
import PopupOk from "../../../../../components/common/Popup/PopupOk";
import Selects2 from "components/common/Forms/Selects2";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //****** Obtenemos el id del curso y el curso en cuestion ******
  const courseTitle = useParams().courseTitle;
  const cleanCourseTitle = courseTitle && courseTitle.replaceAll("-", " ");
  const { courses } = useSelector((state) => state.courses);

  //****** Obtenemos las categorias ******
  const { categories } = useSelector((state) => state.categories);
  const categoriesOptions = categories.map((category) => {
    return {
      name: category.title,
    };
  });

  if (courses.length === 0) {
    return <Spinner />;
  }
  //****** obtenemos los datos del curso *****
  const course = courses.find(
    (course) => course.title.toLowerCase() === cleanCourseTitle
  );
  if (course === undefined) {
    return <Spinner />;
  }
  const {
    title,
    description,
    price,
    duration,
    category,
    level,
    status,
    premium,
    premiumPrice,
    own,
    id,
  } = course && course;
  // ****** FORMULARIO ******
  const INITIAL_VALUES = {
    title: title,
    description: "",
    price: price, //tipo number
    duration: duration, //tipo number
    category: category, //select
    level: level, //select - PRINCIPIANTE/INTERMEDIO/AVANZADO
    status: status, //select - ACTIVO/INACTIVO/BORRADOR
    premium: premium, //select- yes/no - hace referencia de un booleano
    premiumPrice: premiumPrice, //tipo number
    own: own, //select -true/false
  };
  const VALIDATION_SCHEMA = Yup.object({
    title: Yup.string()
      .min(4, "El titulo debe tener al menos 4 caracteres")
      .max(50, "El titulo debe tener máximo 50 caracteres"),
    description: Yup.string(),
    price: Yup.number(),
    // duration en formato de horas y minutos
    duration: Yup.string().matches(
      /^([0-9]{1,2})h ([0-9]{1,2})min$/,
      "Ejemplo: 1h 30min"
    ),
    category: Yup.string(),
    level: Yup.string(),
    status: Yup.string(),
    premium: Yup.string(),
    premiumPrice: Yup.number().when("premium", {
      is: (val) => val === "true",
      then: Yup.number(),
    }),
    own: Yup.string(),
  });
  const handleSubmit = async (values) => {
    values.title = values.title.trim().toLowerCase();
    await dispatch(startChecking());
    const res = await dispatch(startUpdate(id, values));
    if (res.type === types.coursesUpdateError) {
      PopupError(res.payload);
    } else {
      PopupOk("22rem", "success", "Informacion actualizada correctamente");
      navigate("/admin/courses");
    }
  };

  return (
    <Container>
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
                previousValue={level}
                text="Nivel"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="74%"
              />

              <Selects2
                id="premium"
                name="premium"
                options={[{ name: "Si" }, { name: "No" }]}
                previousValue={premium}
                text="Premium"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="74%"
              />

              <Selects2
                id="status"
                name="status"
                options={[
                  { name: "ACTIVO" },
                  { name: "INACTIVO" },
                  { name: "BORRADOR" },
                ]}
                previousValue={status}
                text="Estado del curso"
                backgroundColor="#f5f5f5"
                alignSelf="flex-end"
                width="74%"
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
                previousValue={category}
                backgroundColor="#f5f5f5"
                alignSelf="flex-start"
                width="74%"
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
                previousValue={own}
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
            editValue={description}
          />
          <BoxButton>
            <InputButton
              text="Actualizar informacion del curso"
              width="50%"
              shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
            />
          </BoxButton>
        </Form>
      </Formik>
    </Container>
  );
};

export default General;
