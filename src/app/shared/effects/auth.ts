import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of, defer } from 'rxjs';
import { map, catchError, switchMap, mapTo } from 'rxjs/operators';

import { AuthActionTypes, Auth, AuthSuccess, AuthFailure, SetAccessToken, RemoveAccessToken } from '@app/shared/actions/auth';
import { AuthAPIService } from '@app/shared/services/remote-api/auth-api.service';
import { AccessToken } from '@app/shared/models/access-token';
import { HandleTokenService } from '@app/shared/services/utils/handle-token.service';


@Injectable()
export class AuthEffects {

  @Effect()
  getAccessToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.Auth),
    switchMap(() =>
      this.authService
        .getAccessToken()
        .pipe(
          map((accessToken: AccessToken) => {
            return new AuthSuccess({ accessToken })
          }),
          catchError(error => of(new AuthFailure(error)))
        )
    )
  );

  @Effect()
  removeAccessToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.RemoveAccessToken),
    map(() => new Auth())
  );

  @Effect()
  init$ = defer(() => {
    if (!this.handleToken.isToken()) {
      return of(new Auth());
    } else if (this.handleToken.tokenIsValid()) {
      return of(new SetAccessToken());
    } else if (!this.handleToken.tokenIsValid()) {
      return of(new RemoveAccessToken());
    } 
  });

  constructor(
    private actions$: Actions,
    private authService: AuthAPIService,
    private handleToken: HandleTokenService
  ) {}
}
