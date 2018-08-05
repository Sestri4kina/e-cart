import { AuthActions, AuthActionTypes } from "@app/shared/actions/auth";

export interface State {
  error: string;
  isLoading: boolean;
  hasAccessToken: boolean;
}

export const initialState: State = {
  error: null,
  isLoading: false,
  hasAccessToken: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Auth: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case AuthActionTypes.AuthSuccess: {
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));

      return {
        ...state,
        error: null,
        isLoading: false,
        hasAccessToken: true
      };
    }

    case AuthActionTypes.AuthFailure: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case AuthActionTypes.SetAccessToken: {      
      return {
        ...state,
        hasAccessToken: true
      };
    }

    case AuthActionTypes.RemoveAccessToken: {
      localStorage.removeItem('accessToken');
      
      return {
        ...state,
        hasAccessToken: false
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const hasAccessToken = (state: State) => state.hasAccessToken;
