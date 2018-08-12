import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take, tap, map } from 'rxjs/operators';
import { hasAccessToken } from '@app/shared/reducers/auth.reducer';
import { HandleTokenService } from '@app/shared/services/utils/handle-token.service';
import * as authAction from '@app/shared/actions/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    authCompleted: boolean;

  constructor(
    private store: Store<fromRoot.State>,
    private handleTokenService: HandleTokenService
  ) {
      console.log("***************");
      console.log("inside auth guard");
      this.waitForAuthToComplete();
  }

  waitForAuthToComplete() {
    if ( !this.handleTokenService.getToken() ) {
        this.store.dispatch(new authAction.Auth());
    }
    
    return this.store.select(state => state.auth)
                    .pipe(
                        tap(authState => console.log(authState)),
                        filter(_ => !!_.hasAccessToken),
                        map(authState => authState.hasAccessToken)
                    ).subscribe(hasAccessToken => {
                        this.authCompleted = hasAccessToken;
                    })
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean{
    console.log(this.authCompleted);
    return this.authCompleted;
  }
}
