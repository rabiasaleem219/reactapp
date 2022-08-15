import { types } from "../types/types";

export const initialStateQuizzes = {
  quizzes: [],
  loading: false,
  error: null,
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    //******  Quiz Create ******/
    case types.quizStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.quizCreate:
      return {
        ...state,
        quizzes: [...state.quizzes, action.payload],
        loading: false,
      };
    case types.quizCreateError:
      return {
        ...state,
        loading: false,
      };
    //******  Quiz Fetch ******/
    case types.quizStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.quizFetch:
      return {
        ...state,
        quizzes: action.payload,
        loading: false,
      };
    case types.quizFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Quiz Update ******/
    case types.quizStartUpdate:
      return {
        ...state,
        loading: true,
      };
    case types.quizUpdate:
      return {
        ...state,
        quizzes: [
          ...state.quizzes.map((quiz) =>
            quiz.id === action.payload.id ? action.payload : quiz
          ),
        ],
      };
    case types.quizUpdateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.quizStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.quizDelete:
      return {
        ...state,
        quizzes: [
          ...state.quizzes.filter((quiz) => quiz.id !== action.payload),
        ],
      };
    case types.quizDeleteError:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
