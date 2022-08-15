import { CourseTab } from 'components/layout/CourseTab';
import React from 'react';

const CourseSection2 = ({ setTab, Tab, setLoading, isPay }) => {
  return (
    <>
      <CourseTab
        setTab={setTab}
        Tab={Tab}
        setLoading={setLoading}
        isPay={isPay}
      />
    </>
  );
};

export default CourseSection2;
