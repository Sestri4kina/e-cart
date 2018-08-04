import { Action } from '@ngrx/store';
import { AccessToken } from '@app/shared/models/access-token';

export enum AuthActionTypes {
  Auth = '[AccessToken] Auth',
  AuthSuccess = '[AccessToken] Auth Success',
  AuthFailure = '[AccessToken] Auth Failure'
}

export class Auth implements Action {
  readonly type = AuthActionTypes.Auth;
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AuthSuccess;

  constructor(public payload: { accessToken: AccessToken }) {}
}

export class AuthFailure implements Action {
  readonly type = AuthActionTypes.AuthFailure;

  constructor(public payload: any) {}
}

export type AuthActions =
  Auth
  | AuthSuccess
  | AuthFailure;
