import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import CourseSection1 from './CourseSection1';
import CourseSection2 from './CourseSection2';
import CourseSection3 from './CourseSection3';
import FooterCourse from './FooterCourse';
import { Back } from './styles';

const Course = () => {
  const [loading, setLoading] = useState(false);
  const [Tab, setTab] = useState(1);
  const [isPay, setIsPay] = useState(false);
  const courseTitle = useParams().courseTitle;
  const cleanCourseTitle = courseTitle && courseTitle.replaceAll('-', ' ');
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    const checkPayment = async () => {
      const res = await fetchWithToken(
        `${endPoints.check_payment}/${course.id}`
      );

      const isPay = await res.json();

      if (res.status === 401) {
        setIsPay(false);
        return;
      }
      setIsPay(isPay);
    };
    checkPayment();
  }, []);

  if (courses.length === 0) {
    return <Spinner />;
  }
  const course = courses.find(
    (course) => course.title.toLowerCase() === cleanCourseTitle
  );
  // check if the course is paid

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <Back>
      <CourseSection1 {...course} />
      <CourseSection2
        setTab={setTab}
        Tab={Tab}
        setLoading={setLoading}
        isPay={isPay}
      />
      {Tab === 0 && <CourseSection3 {...course} isPay={isPay} setLoading={setLoading} />}
      <FooterCourse />
    </Back>
  );
};

export default Course;
