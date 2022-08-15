import { Box } from '@mui/material';
import Spinner from 'components/common/Spinner';
import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import { TeacherCard } from 'pages/Admin/Courses/EditCourse/Teachers/TeacherCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const CourseTeachers = () => {
  //**** get teacher by course id *****/
  const course = useParams().courseTitle;
  const cleanCourse = course && course.replaceAll('-', ' ').toLowerCase();
  const courses = useSelector((state) => state.courses.courses);
  const courseId = courses.find(
    (c) => c.title.toLowerCase() === cleanCourse
  ).id;
  const [teachers, setTeachers] = useState('');
  const [loading, setLoading] = useState(true);

  const getTeachers = async (courseId) => {
    const response = await fetchWithToken(
      `${endPoints.get_teachers_by_course}/${courseId}`
    );
    const body = await response.json();
    if (response.status === 200) {
      setTeachers(body);
      setLoading(false);
    } else {
      setTeachers([]);
      setLoading(false);
    }
  };

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getTeachers(courseId);
  }, [flag]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          width: '100%',
        }}
      >
        <Spinner />
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        {teachers.length !== 0 ? (
          teachers.map((teacher) => {
            return (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                courseId={courseId}
              />
            );
          })
        ) : (
          <h1> No hay profesores para este curso</h1>
        )}
      </Box>
    </>
  );
};
