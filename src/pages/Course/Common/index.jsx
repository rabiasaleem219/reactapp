import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    ButtonContainer,
} from 'components/layout/CourseTab/styles'
import { Button } from 'components/common/Buttons/MainButton';
import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import PaymenGateway from 'components/layout/PaymentGateway';


const CommonCourseThings = ({ isPay, setLoading }) => {
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
        console.log(data, "Course section 3")
        if (data.statusCode !== 404) {
            setFirstLesson(data)
        }
    }, [thisCourse])

    return (
        <ButtonContainer>
            {isPay ? (
                <Button
                    text={firstLesson ? "Entra al classroom" : "No se encontró ninguna clase"}
                    fontSize={'1.2rem'}
                    padding={'2rem 4rem'}
                    alignItems={'center'}
                    display={'flex'}
                    disabled={!firstLesson}
                    path={`/course/classroom/${courseTitle}/clase/${firstLesson?.id}`}
                />
            ) : (
                <PaymenGateway
                    user={user}
                    setLoading={setLoading}
                    cleanTitle={cleanTitle}
                    amount={thisCourse.price}
                    courseId={thisCourse.id}
                />
            )}
        </ButtonContainer>
    )

}
export default CommonCourseThings;