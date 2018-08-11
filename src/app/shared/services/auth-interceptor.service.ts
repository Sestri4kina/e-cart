import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError} from "rxjs";

import { catchError, retry } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as authAction from '@app/shared/actions/auth';
import { HandleTokenService } from "@app/shared/services/utils/handle-token.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private handleToken: HandleTokenService,
        private store: Store<fromRoot.State>
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        if (this.getToken() && this.tokenIsValid()) {
            req = this.addTokenToHeaders(req);
        } else if (this.getToken() && !this.tokenIsValid()) {
            this.store.dispatch(new authAction.RemoveAccessToken());
        } 

        return next.handle(req).pipe( 
            catchError(err => {
                console.log(err.message);
                //handle reauth errors
                if (err.status === 401 || err.status === 403) {
                    this.store.dispatch(new authAction.Auth());

                    req = this.addTokenToHeaders(req);
                    return next.handle(req).pipe(retry(3));
                } 
                // handle other errors 
                return throwError(err);
            }) 
        );
    }
    
    private addTokenToHeaders(req) {
        const accessToken = this.getToken().access_token;
        
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    private getToken() {
        return this.injector.get(HandleTokenService).getToken();
    }

    private tokenIsValid() {
        return this.injector.get(HandleTokenService).tokenIsValid();
    }

}
