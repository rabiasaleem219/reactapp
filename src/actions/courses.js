import { endPoints } from "../const/endPoints";
import { types } from "../context/types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

//***** Fetch courses ******//
export const startFetch = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const resp = await fetchWithToken(endPoints.get_all_courses);
    const body = await resp.json();
    if (resp.status === 401) {
      const resp = await fetchWithoutToken(
        `${endPoints.get_courses_by_status}/ACTIVO`
      );
      const body = await resp.json();
      if (resp.status !== 200) {
        return dispatch(fetchError(body.message));
      }
      return dispatch(fetchSuccess(body));
    }
    if (resp.status !== 200) {
      return dispatch(fetchError(body.message));
    }
    return dispatch(fetchSuccess(body));
  };
};

const fetchStart = () => ({
  type: types.coursesStartFetch,
  payload: {},
});

const fetchSuccess = (courses) => ({
  type: types.coursesFetch,
  payload: courses,
});

const fetchError = (error) => ({
  type: types.coursesFetchError,
  payload: error,
});

//***** Create courses ******//
export const startCreate = (value) => {
  return async (dispatch) => {
    dispatch(createStart());
    const resp = await fetchWithToken(endPoints.create_course, value, "PUT");
    const body = await resp.json();
    if (resp.status !== 201) {
      return dispatch(createError(body.message));
    }
    return dispatch(createSuccess(body));
  };
};

const createStart = () => ({
  type: types.coursesStartCreate,
  payload: {},
});

const createSuccess = (course) => ({
  type: types.coursesCreate,
  payload: course,
});

const createError = (error) => ({
  type: types.coursesCreateError,
  payload: error,
});

//***** Update courses ******//
export const startUpdate = (id, value) => {
  return async (dispatch) => {
    dispatch(updateStart());
    const resp = await fetchWithToken(
      `${endPoints.update_course}/${id}`,
      value,
      "PUT"
    );
    const body = await resp.json();
    if (resp.status !== 200) {
      return dispatch(updateError(body.message));
    }
    return dispatch(updateSuccess(body));
  };
};

const updateStart = () => ({
  type: types.coursesStartUpdate,
  payload: {},
});

const updateError = (error) => ({
  type: types.coursesUpdateError,
  payload: error,
});

const updateSuccess = (course) => ({
  type: types.coursesUpdate,
  payload: course,
});

//***** Delete courses ******//
export const startDelete = (id, confirmPassword) => {
  return async (dispatch) => {
    dispatch(deleteStart());
    const resp = await fetchWithToken(
      `${endPoints.delete_course}/${id}`,
      { password: confirmPassword },
      "DELETE"
    );
    const body = await resp.json();
    if (resp.status !== 200) {
      return dispatch(deleteError(body.message));
    }
    return dispatch(deleteSuccess(id));
  };
};

const deleteStart = () => ({
  type: types.coursesStartDelete,
  payload: {},
});

const deleteSuccess = (id) => ({
  type: types.coursesDelete,
  payload: id,
});

const deleteError = (error) => ({
  type: types.coursesDeleteError,
  payload: error,
});
