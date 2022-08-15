import { types } from "../types/types";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    //******  Categories Create******/
    case types.categoriesStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.categoriesCreate:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };
    case types.categoriesCreateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Categories Fetch******/
    case types.categoriesStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.categoriesFetch:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case types.categoriesFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Categories Delete******/
    case types.categoriesStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.categoriesDelete:
      return {
        ...state,
        categories: [
          ...state.categories.filter(
            (category) => category.id !== action.payload
          ),
        ],
        loading: false,
      };
    case types.categoriesDeleteError:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
