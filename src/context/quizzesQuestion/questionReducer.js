import { types } from "../types/types";

export const initialState = {
  questions: [],
  loading: false,
  error: null,
};

export const questionReducer = (state, action) => {
  switch (action.type) {
    //******  Question Create******/
    case types.questionStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.questionCreate:
      return {
        questions: [...state.questions, action.payload],
        loading: false,
      };
    case types.questionCreateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Question Fetch******/
    case types.questionStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.questionFetch:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case types.questionFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Question Update******/
    case types.questionStartUpdate:
      return {
        ...state,
        loading: true,
      };
    case types.questionUpdate:
      return {
        ...state,
        questions: [
          ...state.question.map((question) =>
            question.id === action.payload.id ? action.payload : question
          ),
        ],
        loading: false,
      };
    case types.questionUpdateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Question Delete******/
    case types.questionStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.questionDelete:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload
        ),
      };
    case types.questionDeleteError:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
