import {
  CoruseDescription,
  CourseButton,
  CourseContainer,
  CourseContend,
  CourseImage,
  CourseInstructor,
  CoursePrice,
  CourseTitle,
} from './styles';

import courseImage from '../../../assets/images/course-image.png';
import { Button } from '../../common/Buttons/MainButton';
import { Divider } from '@mui/material';
import { toCapitalize } from 'helpers/toCapitalize';

export const MyCourseItem = ({ course }) => {
  const { title, duration, level } = course;
  const titleToUrl = (title) => {
    return title && title.toLowerCase().split(' ').join('-');
  };
  return (
    <CourseContainer>
      <CourseImage>
        <img src={courseImage} alt="course" />
      </CourseImage>
      <CourseContend>
        <CourseTitle>
          <h1>{title}</h1>
        </CourseTitle>
        <CoruseDescription></CoruseDescription>
        <Divider
          sx={{
            margin: '2rem 0 0.5rem 0',
            backgroundColor: '#6385B8',
          }}
        />
        <CourseInstructor>
          <p>Duración: {duration}</p>
          <p>Nivel: {toCapitalize(level)}</p>
        </CourseInstructor>
        <Button
          text="Ver Curso"
          width="%100"
          path={`/course/${titleToUrl(title)}`}
        />
      </CourseContend>
    </CourseContainer>
  );
};
