import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";

//**** Create Section ****/
export const startCreate = async (value, courseId) => {
  const resp = await fetchWithToken(
    `${endPoints.create_section}/${courseId}`,
    value,
    "PUT"
  );
  const body = await resp.json();

  return body;
};

//**** Fetch Sections ****/

export const startFetchSections = async (courseId) => {
  const resp = await fetchWithToken(
    `${endPoints.get_all_sections_by_course}/${courseId}`,
    {}
  );
  const body = await resp.json();
  return body;
};

//**** Update Section ****/

export const startUpdate = async (value, sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.update_section}/${sectionId}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//**** Delete Section ****/

export const startDelete = async (sectionId) => {
  const resp = await fetchWithToken(
    `${endPoints.delete_section}/${sectionId}`,
    {},
    "DELETE"
  );
  const body = await resp.json();

  return body;
};
