import React, { useEffect, useState } from 'react';

import { videoUrl } from 'const/videoUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { toCapitalize } from 'helpers/toCapitalize';
import { fetchWithToken } from 'helpers/fetch';
import { endPoints } from 'const/endPoints';
import Spinner from 'components/common/Spinner';

import { sortByCreateDate } from 'helpers/sort';
import { useSelector } from 'react-redux';
import { getActualDate } from 'helpers/getDate';
import { VideoLesson } from './Lessons';
import { Box } from '@mui/system';
import { BackgroundNavbar } from 'components/common/BackgroundNavbar';
import { MenuBar } from 'components/common/MenuBar';
import { Quiz } from './Quiz';

const Classroom = () => {
  const [lessonsAndQuizzes, setLessonsAndQuizzes] = useState([]);
  const [lesson, setLesson] = React.useState([]);
  const [resources, setResources] = useState([]);
  const [section, setSection] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [nextSection, setNextSection] = React.useState([]);

  const [isPay, setIsPay] = React.useState(null);

  const navigate = useNavigate();

  const { courseTitle, lessonId, type } = useParams();
  const cleanTitle = toCapitalize(courseTitle.replace(/-/g, ' '));

  const { courses } = useSelector((state) => state.courses);
  const course = courses.find(
    (course) => course.title.toLowerCase() === cleanTitle.toLowerCase()
  );
  useEffect(() => {
    course && getLessonsAndQuizzes(course.id);
    getLesson();
    checkPayment();
  }, [lessonId]);


  const getLessonsAndQuizzes = async (courseId) => {
    const section = await fetchWithToken(
      `${endPoints.get_section_by_lesson}/${lessonId}`
    );
    const bodySection = await section.json();
    setSection(bodySection);

    const lessons = await fetchWithToken(
      `${endPoints.get_all_lessons_by_section}/${bodySection.id}`
    );
    const bodyLessons = await lessons.json();
    const quizzes = await fetchWithToken(
      `${endPoints.get_all_quiz_by_section}/${bodySection.id}`
    );
    const bodyQuizzes = await quizzes.json();
    console.log(bodyLessons, bodyQuizzes, "hsahdkasj")

    const resources = await fetchWithToken(`${endPoints.get_all_resource}/${bodySection.id}`);
    const bodyResources = await resources.json();
    setResources(bodyResources)
    console.log(bodyResources)
    if (lessons.status === 200 && quizzes.status === 200) {
      setLessonsAndQuizzes(sortByCreateDate(bodyLessons, bodyQuizzes));
      setLoading(false);
    } else {
      setLessonsAndQuizzes([]);
      setLoading(false);
    }
  };

  // check if the course is paid
  const checkPayment = async () => {
    const res = await fetchWithToken(`${endPoints.check_payment}/${course.id}`);
    const isPay = await res.json();
    setIsPay(isPay);
  };

  const getLesson = async () => {
    const response = await fetchWithToken(
      `${endPoints.get_lesson_by_id}/${lessonId}`
    );
    const body = await response.json();
    if (response.status === 200) {
      setLesson(body);
      console.log(body, "hiasdas")
      setLoading(false);
    }
    setLoading(false);
  };

  // const getNextSection = async () => {
  //   const section = await fetchWithToken(
  //     `${endPoints.get_section_by_lesson}/${lessonId}`
  //   );
  //   const bodySection = await section.json();
  //   const findDto = { courseId: course.id, index: bodySection.index + 1 };
  //   const res = await fetchWithToken(
  //     `${endPoints.get_section_by_index}`,
  //     findDto,
  //     'POST'
  //   );
  //   const body = await res.json();
  //   const nextLessons = await fetchWithToken(
  //     `${endPoints.get_all_lessons_by_section}/${body.id}`
  //   );
  //   const bodyNextLessons = await nextLessons.json();
  //   if (bodyNextLessons.length < 0) {
  //     const res = await fetchWithToken(
  //       `${endPoints.get_all_quiz_by_section}/${body.id}`
  //     );
  //     const bodyQuizzes = await res.json();
  //     setNextSection(bodyQuizzes);
  //     return;
  //   }
  //   setNextSection(bodyNextLessons);
  // };

  const date = getActualDate(lesson.createdAt);
  if (loading) {
    return <Spinner />;
  }

  if (isPay === false) {
    navigate(`/courses`);
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        height: 'calc(100vh - 84px)',
      }}
    >
      <BackgroundNavbar />
      <MenuBar />

      {type === 'clase' ? (
        <VideoLesson
          date={date}
          type={type}
          lesson={lesson}
          section={section}
          lessonsAndQuizzes={lessonsAndQuizzes}
          cleanTitle={cleanTitle}
          courseTitle={courseTitle}
          lessonId={lessonId}
          videoUrl={videoUrl}
          nextSection={nextSection}
          course={course}
          resources={resources}
        />
      ) : (
        <Quiz />
      )}
    </Box>
  );
};

export default Classroom;
