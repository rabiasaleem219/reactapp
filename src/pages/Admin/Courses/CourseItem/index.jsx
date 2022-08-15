import { Divider } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog } from 'primereact/dialog';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import {
  ButtonsContainer,
  ConfirmFeaturedContainer,
  CoruseDescription,
  CourseContainer,
  CourseContend,
  CourseImage,
  CourseInstructor,
  CourseTitle,
  FeaturedCourseIcon,
  Formulario,
} from './styles';
import courseImage from '../../../../assets/images/course-image.png';
import { Button } from '../../../../components/common/Buttons/MainButton';
import { useState } from 'react';
import { fetchWithToken } from '../../../../helpers/fetch';
import { endPoints } from '../../../../const/endPoints';
import InputButton from '../../../../components/common/Forms/FormButton';
import { Form, Formik } from 'formik';
import Input from '../../../../components/common/Forms/Inputs';
import { startDelete } from '../../../../actions/courses';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { types } from '../../../../context/types/types';
import { startChecking } from '../../../../actions/auth';
import { titleToUrl } from 'helpers/titleToUrl';

export const AdminCourseItem = ({
  image,
  title,
  createdAt,
  level,
  status,
  id,
  numberOfStudents,
  featured,
}) => {
  const dispatch = useDispatch();

  //** Set feature course */
  const setFeatured = async (id) => {
    const resp = await fetchWithToken(
      `${endPoints.set_feature_course}/${id}`,
      {},
      'PUT'
    );
    const body = await resp.json();
    if (resp.status === 200) {
      Swal.fire({
        title: body.message,
        text: 'Los cursos destacados aparecerán en la página principal',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        text: body.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    dispatch(startChecking());
  };

  //** get course image fetch */
  const getCourseImage = async (img) => {
    const resp = await fetchWithToken(`${endPoints.get_course_image}/${img}`);
    const body = await resp.json();
    if (resp.status === 200) {
      return body.image;
    }
  };

  //** Convert timestamp to date array */
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //** MODAL */
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
  };
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  //***** Formik */
  const INITIAL_VALUES = {
    password: '',
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(startChecking());
    const resp = await dispatch(startDelete(id, values.password));
    if (resp.type === types.coursesDelete)
      Swal.fire({
        icon: 'success',
        title: 'Curso eliminado correctamente',
        showConfirmButton: false,
        timer: 2000,
      });
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar el curso',
        text: resp.payload,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    onHide('displayBasic');
  };

  return (
    <CourseContainer>
      <FeaturedCourseIcon onClick={() => onClick('displayBasic2')}>
        {featured ? (
          <StarRoundedIcon
            sx={{
              color: '#ffc107',
            }}
          />
        ) : (
          <StarOutlineRoundedIcon
            sx={{
              color: '#ffc107',
            }}
          />
        )}
      </FeaturedCourseIcon>
      <Dialog
        header="Confirmar"
        visible={displayBasic2}
        style={{
          width: '50vw',
        }}
        onHide={() => onHide('displayBasic2')}
      >
        <ConfirmFeaturedContainer>
          {featured ? (
            <p> ¿Esta seguro que desea eliminar este curso de descatados?</p>
          ) : (
            <p> ¿Esta seguro que desea destacar este curso?</p>
          )}

          <InputButton
            text="OK"
            backgroundColor="#5e82be"
            backgroundColorHover="#5e82be"
            fontSize="1rem"
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignSelf="center"
            onClick={() => {
              setFeatured(id);
            }}
          />
        </ConfirmFeaturedContainer>
      </Dialog>
      <CourseImage>
        {/* <img src={image || courseImage} alt="course" /> */}
        <img
          src={
            image
              ? `http://localhost:3333${endPoints.get_course_image}/${image}`
              : courseImage
          }
        />
      </CourseImage>
      <CourseContend>
        <CourseTitle>
          <h1>{title}</h1>
        </CourseTitle>
        <CoruseDescription>
          <p>{`Creado el: ${day}/${month}/${year}`}</p>
          <p>{`Alumnos: ${numberOfStudents}`}</p>
        </CoruseDescription>
        <Divider
          sx={{
            margin: '2rem 0 0.5rem 0',
            backgroundColor: '#6385B8',
          }}
        />
        <CourseInstructor>
          <h3>Nivel: {level}</h3>
          <h3>Estado: {status}</h3>
        </CourseInstructor>
        <ButtonsContainer>
          <Button
            text={<EditIcon />}
            // path={`/admin/courses/edit`}
            path={`/admin/courses/edit/${titleToUrl(title)}`}
            fontSize="1rem"
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          />
          <Button
            text={<VisibilityIcon />}
            path={`/course/${titleToUrl(title)}`}
            fontSize="1rem"
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          />
          <InputButton
            text={<HighlightOffIcon />}
            backgroundColor="#ff555b"
            backgroundColorHover="#ff555b"
            fontSize="1rem"
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => onClick('displayBasic')}
          />
          <Dialog
            header="Confirma tu contraseña"
            visible={displayBasic}
            style={{ width: '50vw' }}
            onHide={() => onHide('displayBasic')}
          >
            <p>Si estas seguro de eliminar el curso, confirma tu contraseña:</p>
            <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
              <Form>
                <Formulario>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Confirma tu contraseña"
                  />
                  <InputButton
                    text="Eliminar curso"
                    backgroundColor="#ff555b"
                    backgroundColorHover="#ff555b"
                    fontSize="1rem"
                    width="30%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    alignSelf="center"
                  />
                </Formulario>
              </Form>
            </Formik>
          </Dialog>
        </ButtonsContainer>
      </CourseContend>
    </CourseContainer>
  );
};
