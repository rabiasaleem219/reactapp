import { TabPanel, TabView } from 'primereact/tabview';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import imgDefault from 'assets/images/course-image.png';
import {
  ButtonContainer,
  Container,
  ImgContainer,
  MenuContainer,
  NavbarContainer,
  ShadowContainer,
} from './styles';
import { Description } from './Description';
import { CourseTeachers } from './Teachers';
import { Lessons } from './Lessons';
import PaymenGateway from '../PaymentGateway';
import { Button } from 'components/common/Buttons/MainButton';
import { BASE_URL, endPoints } from 'const/endPoints';
import ViewComments from './Comments/ViewComments'
import AddComments from './Comments/AddComments';
import { fetchWithToken } from 'helpers/fetch';
import CommonCourseThings from 'pages/Course/Common';
import Certificates from '../CoursePage/Certificates';
export const CourseTab = ({ setTab, Tab, setLoading, isPay }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  setTab(activeIndex);
  const { courses } = useSelector((state) => state.courses);
  const courseTitle = useParams().courseTitle;
  const [firstLesson, setFirstLesson] = useState();
  const cleanCourseTitle = courseTitle && courseTitle.replaceAll('-', ' ');
  const cleanTitle = cleanCourseTitle
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  const thisCourse = courses.find(
    (course) => course && course.title.toLowerCase() === cleanCourseTitle
  );

  const user = useSelector((state) => state.user);

  useEffect(async () => {
    const resp = await fetchWithToken(`${endPoints.get_first_lesson_by_courseId}/${thisCourse.id}`)
    const data = await resp.json()
    if (data.statusCode !== 404) {
      setFirstLesson(data)
    }
  }, [thisCourse])

  return (
    <Container>
      <ShadowContainer>
        <ImgContainer>
          <img
            src={
              thisCourse.image
                ? `${BASE_URL}${endPoints.get_course_image}/${thisCourse.image}`
                : imgDefault
            }
            alt="imagen del curso"
          />
          <CommonCourseThings isPay={isPay} setLoading={setLoading} />
        </ImgContainer>
        <NavbarContainer>
          <MenuContainer maxHeight={Tab === 0 ? '450px' : null}>
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="Descripcion" headerStyle={{}}>
                <Description description={thisCourse.description} />
              </TabPanel>
              <TabPanel header="Profesores">
                <CourseTeachers />
              </TabPanel>
              <TabPanel header="Clases">
                <Lessons
                  courseId={thisCourse.id}
                  courseTitle={courseTitle}
                  isPay={isPay}
                />
              </TabPanel>
              <TabPanel header="Comentarios">
                {isPay ? <AddComments courseId={thisCourse.id} /> : <ViewComments courseId={thisCourse.id} oldComments={false} />}
              </TabPanel>
              {
                isPay &&
                <TabPanel header='Certificate'>
                  <Certificates course={thisCourse} />
                </TabPanel>
              }
            </TabView>
          </MenuContainer>
        </NavbarContainer>
      </ShadowContainer>
    </Container>
  );
};
