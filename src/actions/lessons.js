import { endPoints } from "../const/endPoints";
import { fetchWithToken } from "../helpers/fetch";

//**** Create Lesson ****/
export const startCreate = async (value, sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.create_lesson}/${sectionId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//**** Fetch Lessons ****/
export const startFetchLessons = async (sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.get_all_lessons_by_section}/${sectionId}`,
    {}
  );
  const body = await resp.json();
  return body;
};

//**** Update Lesson ****/
export const startUpdate = async (value, lessonId) => {
  const resp = await fetchWithToken(
    `${endPoints.update_lesson}/${lessonId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//**** Delete Lesson ****/

export const startDelete = async (lessonId) => {
  const resp = await fetchWithToken(
    `${endPoints.delete_lesson}/${lessonId}`,
    {},
    "DELETE"
  );
  const body = await resp.json();
  console.log(body, "sdfjkdsj");
  return body;
};
