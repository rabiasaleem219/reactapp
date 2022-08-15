import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";

//*Create Question */
export const startCreate = async (value, quizId) => {
  const resp = await fetchWithToken(
    `${endPoints.create_question}/${quizId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//*Fetch Questions */
export const startFetchQuestions = async (quizId) => {
  const resp = await fetchWithToken(
    `${endPoints.get_all_questions_by_quiz}/${quizId}`,
    {}
  );
  const body = await resp.json();
  return body;
};

//*Update Question */
export const startUpdate = async (value, questionId) => {
  const resp = await fetchWithToken(
    `${endPoints.update_question}/${questionId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//*Delete Question */
export const startDelete = async (questionId) => {
  const resp = await fetchWithToken(
    `${endPoints.delete_question}/${questionId}`,
    {},
    "DELETE"
  );
  const body = await resp.json();
  return body;
};
