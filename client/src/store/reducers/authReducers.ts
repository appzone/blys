import { IAuthState } from ".";
import { IReduxAction } from "../../interfaces/ICommon";
import {
  CHECK_SESSION,
  CHECK_SESSION_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  VERIFY,
  VERIFY_FAILED,
  VERIFY_SUCCESS,
} from "../actionTypes";

const initialState: IAuthState = {
  isLoading: false,
  isLoggedIn: false,
  user: undefined,
  errorMessage: undefined,
};

export default (state = initialState, action: IReduxAction): IAuthState => {
  switch (action.type) {
    case CHECK_SESSION:
      return {
        ...state,
        isLoading: true,
      };

    case CHECK_SESSION_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case VERIFY:
      return {
        ...state,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case VERIFY_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.payload.message,
      };

    case LOGOUT:
      return {
        ...state,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
