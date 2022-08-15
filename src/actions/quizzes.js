import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";

//**** Create Quiz ****/
export const startCreate = async (value, sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.create_quiz}/${sectionId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//**** Fetch Quizzes ****/
export const startFetchQuizzes = async (sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.get_all_quiz_by_section}/${sectionId}`,
    {}
  );
  const body = await resp.json();
  return body;
};

//**** Update Quiz ****/
export const startUpdate = async (value, quizId) => {
  const resp = await fetchWithToken(
    `${endPoints.update_quiz}/${quizId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//**** Delete Quiz ****/
export const startDelete = async (quizId) => {
  const resp = await fetchWithToken(
    `${endPoints.delete_quiz}/${quizId}`,
    {},
    "DELETE"
  );
  const body = await resp.json();
  return body;
};
