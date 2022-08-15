import { types } from "../types/types";

export const initialState = {
  sections: [],
  loading: false,
  error: null,
};

export const sectionReducer = (state, action) => {
  switch (action.type) {
    //******  Section Create******/
    case types.sectionStartCreate:
      return {
        ...state,
        loading: true,
      };
    case types.sectionCreate:
      return {
        ...state,
        sections: [...state.sections, action.payload],
        loading: false,
      };
    case types.sectionCreateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Section Fetch******/
    case types.sectionStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.sectionFetch:
      return {
        ...state,
        sections: action.payload,
        loading: false,
      };
    case types.sectionFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Section Update******/
    case types.sectionStartUpdate:
      return {
        ...state,
        loading: true,
      };
    case types.sectionUpdate:
      return {
        ...state,
        sections: [
          ...state.sections.map((section) =>
            section.id === action.payload.id ? action.payload : section
          ),
        ],
        loading: false,
      };
    case types.sectionUpdateError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //******  Section Delete******/
    case types.sectionStartDelete:
      return {
        ...state,
        loading: true,
      };
    case types.sectionDelete:
      return {
        ...state,
        sections: [
          ...state.sections.filter((section) => section.id !== action.payload),
        ],
        loading: false,
      };
    case types.sectionDeleteError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
