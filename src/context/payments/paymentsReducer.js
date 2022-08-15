import { types } from "../types/types";

export const initialState = {
  payments: [],
  loading: false,
  error: null,
  message: null,
};

export const paymentsReducer = (state, action) => {
  switch (action.type) {
    //******  Payment Fetch ******/
    case types.paymentStartFetch:
      return {
        ...state,
        loading: true,
      };
    case types.paymentFetch:
      return {
        payments: action.payload,
        loading: false,
      };
    case types.paymentFetchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //******  Payment Approved ******/
    case types.paymentStartApproved:
      return {
        ...state,
        loading: true,
      };
    case types.paymentApproved:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case types.paymentApprovedError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //******  Payment Rejected ******/

    case types.paymentStartRejected:
      return {
        ...state,
        loading: true,
      };
    case types.paymentRejected:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case types.paymentRejectedError:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
