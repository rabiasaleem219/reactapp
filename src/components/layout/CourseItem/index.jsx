import {
  CoruseDescription,
  CourseContainer,
  CourseContend,
  CourseImage,
  CourseInstructor,
  CoursePrice,
  CourseTitle,
} from './styles';

import imgDefault from '../../../assets/images/hero-image.png';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '../../common/Buttons/MainButton';
import { toCapitalize } from 'helpers/toCapitalize';
import { BASE_URL, endPoints } from 'const/endPoints';

export const CourseItem = ({
  price,
  numberOfStudents,
  duration,
  title,
  level,
  id,
  description,
  backgroundColor,
  image,
}) => {
  const getWidth = () => {
    return window.innerWidth;
  };

  const titleToUrl = (title) => {
    return title && title.toLowerCase().split(' ').join('-');
  };
  return (
    <>
      <CourseContainer backgroundColor={backgroundColor && backgroundColor}>
        <CourseImage>
          <img
            src={
              image
                ? `${BASE_URL}${endPoints.get_course_image}/${image}`
                : imgDefault
            }
            alt="course"
          />
        </CourseImage>
        <CourseContend>
          <CourseTitle>
            <h1>{title}</h1>
          </CourseTitle>
          <CoruseDescription>
            <p>Duracion del curso: {duration}</p>
            <p>Nivel: {toCapitalize(level)}</p>
            {/* {text} */}
          </CoruseDescription>
          <CoursePrice>
            <p>
              <PersonIcon
                sx={{
                  color: '#898989',
                }}
                fontSize="large"
              />
              {numberOfStudents}
            </p>
            <p>{price}$</p>
          </CoursePrice>
          <CourseInstructor>
            {/* <h3>Prf. Alberto gonzalez</h3>
          <p>Licenciado en Desarrollo web</p> */}
          </CourseInstructor>
          <Button
            text="Ver Curso"
            path={`/course/${titleToUrl(title)}`}
            width="50%"
            alignSelf={getWidth() < 600 ? 'center' : ''}
            fontSize={getWidth() < 600 ? '1rem' : ''}
          />
        </CourseContend>
      </CourseContainer>
    </>
  );
};
