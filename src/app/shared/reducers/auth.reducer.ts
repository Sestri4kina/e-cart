import { AuthActions, AuthActionTypes } from "@app/shared/actions/auth";

export interface State {
  error: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  error: null,
  isLoading: false
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
      };
    }

    case AuthActionTypes.AuthFailure: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
