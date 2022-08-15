import { useSelector } from 'react-redux';
import { CourseItem } from '../../../components/layout/CourseItem';
import { HomeCourseContainer, HomeCourseList, HomeCourseTitle } from './styles';

export const HomeSection2 = () => {
  const { courses } = useSelector((state) => state.courses);

  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <HomeCourseContainer>
      {featuredCourses.length > 0 && (
        <>
          <HomeCourseTitle>
            <h1>Curso destacados</h1>
          </HomeCourseTitle>
          <HomeCourseList>
            <CourseItem {...featuredCourses[0]} />
          </HomeCourseList>
        </>
      )}
    </HomeCourseContainer>
  );
};
