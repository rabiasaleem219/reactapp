import { endPoints } from 'const/endPoints';
import { fetchWithToken } from 'helpers/fetch';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmQuiz } from '../ConfirmQuiz';
import { SectionContainer } from '../Lessons/styles';
import { Typography } from '@mui/material';
import { Question } from './Question';
import { Box } from '@mui/system';
import { Timer } from './Timer';
import { useSelector } from 'react-redux';
import { Button } from 'components/common/Buttons/MainButton';
import { Dialog } from 'primereact/dialog';
import { QuizResults } from './Modal/QuizResults';
import Spinner from 'components/common/Spinner';

export const Quiz = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses);
  const { lessonId, courseTitle } = useParams();

  const [confirm, setConfirm] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quizResults, setQuizResults] = useState(null);

  const [displayModal, setDisplayModal] = useState(false);
  const [responses, setResponses] = useState([]);

  //**** Modal */
  const onDislayModal = () => {
    setDisplayModal(true);
  };
  const courseCleanTitle = courseTitle.replace(/-/g, ' ');
  const actualCourse =
    courses &&
    courses?.find((course) => {
      return course.title === courseCleanTitle;
    });
  const getQuizContent = async () => {
    const quizResponse = await fetchWithToken(
      `${endPoints.get_quiz_by_id}/${lessonId}`
    );
    const quizData = await quizResponse.json();
    const questionsResponse = await fetchWithToken(
      `${endPoints.get_all_questions_by_quiz}/${lessonId}`
    );
    const questionsData = await questionsResponse.json();

    setQuiz(quizData);
    setQuestions(questionsData);

    const initialResponses = questionsData.map((question) => ({
      questionId: question.id,
      option: {
        title: '',
        isCorrect: false,
      },
    }));
    setResponses(initialResponses);
  };

  const setScore = (responses, courseId, quizId) => {
    const options = responses.map((response) => {
      const responseTitle = response.option.title;
      const isCorrect = response.option.isCorrect;
      return { responseTitle, isCorrect };
    });
    const scoreFormat = {
      courseId,
      quizId,
      options,
    };
    return scoreFormat;
  };

  const handleSubmit = async () => {
    const score = setScore(responses, actualCourse.id, quiz.id);
    const response = await fetchWithToken(endPoints.set_score, score, 'PUT');
    if (response.status === 200) {
      const data = await response.json();
      setQuizResults(data);
      onDislayModal();
    }
  };

  useEffect(() => {
    getQuizContent();
  }, []);

  useEffect(() => {
    if (quiz && questions) {
      setScore(responses, actualCourse.id, quiz.id);
    }
  }, [responses]);

  return (
    <SectionContainer>
      {!confirm ? (
        <ConfirmQuiz quiz={quiz} setConfirm={setConfirm} />
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Timer
            duration={quiz.duration}
            handleSubmit={handleSubmit}
            onDislayModal={onDislayModal}
          />
          <Box
            sx={{
              width: '50%',
              marginTop: '2rem',
            }}
          >
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  responses={responses}
                  setResponses={setResponses}
                  question={question}
                />
              );
            })}
          </Box>
          <QuizResults
            handleSubmit={handleSubmit}
            displayModal={displayModal}
            quizResults={quizResults}
          />
        </Box>
      )}
    </SectionContainer>
  );
};
