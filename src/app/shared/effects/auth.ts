import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AuthActionTypes, Auth, AuthSuccess, AuthFailure } from '@app/shared/actions/auth';
import { AuthAPIService } from '@app/shared/services/remote-api/auth-api.service';
import { AccessToken } from '@app/shared/models/access-token';


@Injectable()
export class AuthEffects {

  @Effect()
  getAccessToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.Auth),
    switchMap(() =>
      this.authService
        .getAccessToken()
        .pipe(
          map((accessToken: AccessToken) => new AuthSuccess({ accessToken })),
          catchError(error => of(new AuthFailure(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthAPIService
  ) {}
}
