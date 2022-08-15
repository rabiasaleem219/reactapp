import { endPoints } from "../const/endPoints";
import { types } from "../context/types/types";
import { fetchWithToken } from "../helpers/fetch";

//**** Create Category ****/

export const startCreate = (value) => {
  return async (dispatch) => {
    dispatch(createStart());
    const resp = await fetchWithToken(endPoints.create_category, value, "PUT");
    const body = await resp.json();
    if (resp.status !== 200) {
      return dispatch(createError(body.message));
    }
    return dispatch(createSuccess(body));
  };
};

const createStart = () => ({
  type: types.categoriesStartCreate,
  payload: {},
});

const createSuccess = (category) => ({
  type: types.categoriesCreate,
  payload: category,
});

const createError = (error) => ({
  type: types.categoriesCreateError,
  payload: error,
});

//**** Fetch Categories ****/

export const startFetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const resp = await fetchWithToken(endPoints.get_all_categories);
    const body = await resp.json();
    if (resp.status !== 200) {
      return dispatch(fetchError(body.message));
    }
    return dispatch(fetchSuccess(body));
  };
};

const fetchStart = () => ({
  type: types.categoriesStartFetch,
  payload: {},
});

const fetchSuccess = (categories) => ({
  type: types.categoriesFetch,
  payload: categories,
});

const fetchError = (error) => ({
  type: types.categoriesFetchError,
  payload: error,
});

//**** Delete Categories ****/

export const startDelete = (id) => {
  return async (dispatch) => {
    dispatch(deleteStart());
    const resp = await fetchWithToken(
      endPoints.delete_categories,
      id,
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
  type: types.categoriesStartDelete,
  payload: {},
});

const deleteSuccess = (id) => ({
  type: types.categoriesDelete,
  payload: id,
});

const deleteError = (error) => ({
  type: types.categoriesDeleteError,
  payload: error,
});
