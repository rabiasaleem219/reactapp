import { types } from '../types/types';

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    //******  Courses Fetch******/
    case types.coursesStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.coursesFetch:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case types.coursesFetchSuccess:
      return {
        ...state,
        loading: false,
      };
    case types.coursesFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******Courses Create******/
    case types.coursesStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.coursesCreate:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        loading: false,
      };
    case types.coursesCreateSuccess:
      return {
        ...state,
        loading: false,
      };
    case types.coursesCreateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Courses Update******/
    case types.coursesStartUpdate:
      return {
        ...state,
        loading: true,
      };
    case types.coursesUpdate:
      return {
        ...state,
        courses: [
          ...state.courses.filter((course) => course.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      };

    case types.coursesUpdateSuccess:
      return {
        ...state,
        loading: false,
      };
    case types.coursesUpdateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Courses Delete******/
    case types.coursesStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.coursesDelete:
      return {
        ...state,
        courses: [
          ...state.courses.filter((course) => course.id !== action.payload),
        ],
        loading: false,
      };
    case types.coursesDeleteSuccess:
      return {
        ...state,
        loading: false,
      };
    case types.coursesDeleteError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
