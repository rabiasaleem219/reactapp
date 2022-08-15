import { types } from "../types/types";

export const initialStateLessons = {
  lessons: [],
  loading: false,
  error: null,
};

export const lessonsReducer = (state, action) => {
  switch (action.type) {
    //****** Lesson Create ******/
    case types.lessonStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.lessonCreate:
      return {
        ...state,
        lessons: [...state.lessons, action.payload],
        loading: false,
      };
    case types.lessonCreateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //****** Lesson Fetch ******/
    case types.lessonStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.lessonFetch:
      return {
        ...state,
        lessons: action.payload,
        loading: false,
      };
    case types.lessonFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //****** Lesson Update ******/
    case types.lessonStartUpdate:
      return {
        ...state,
        loading: true,
      };
    case types.lessonUpdate:
      return {
        ...state,
        lessons: [
          ...state.lessons.map((lesson) =>
            lesson.id === action.payload.id ? action.payload : lesson
          ),
        ],
        loading: false,
      };
    case types.lessonUpdateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //****** Lesson Delete ******/
    case types.lessonStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.lessonDelete:
      return {
        ...state,
        lessons: [
          ...state.lessons.filter((lesson) => lesson.id !== action.payload),
        ],
      };
    case types.lessonDeleteError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
