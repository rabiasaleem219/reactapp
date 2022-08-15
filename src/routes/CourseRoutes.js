import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Certificates from '../components/layout/CoursePage/Certificates';
import Comments from '../components/layout/CoursePage/Comments';
import Curriculum from '../components/layout/CoursePage/Curriculum';
import Description from '../components/layout/CoursePage/Description';
import Teachers from '../components/layout/CoursePage/Teachers';
import Classroom from '../pages/Classroom/Clasroom';
import { PrivateRoute } from './PrivateRoute';

const Course = lazy(() => import('../pages/Course/Course'));

const CourseRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/course/:courseTitle" element={<Course />}>
          <Route path="description" element={<Description />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="Curriculum" element={<Curriculum />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        <Route
          path="/course/classroom/:courseTitle/:type/:lessonId"
          element={
            <PrivateRoute>
              <Classroom />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default CourseRoutes;
