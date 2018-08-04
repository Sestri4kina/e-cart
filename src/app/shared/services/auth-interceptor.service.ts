import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable , of, throwError} from "rxjs";
//import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ConfigService } from "@app/shared/config/config.service";
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as authAction from '@app/shared/actions/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
        private config: ConfigService,
        private store: Store<fromRoot.State>
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.getToken() && this.tokenIsValid()) {
            req = this.addTokenToHeaders(req);
        } else if (this.getToken() && !this.tokenIsValid()) {
            this.removeToken();
            //ADD HANDLING REAUTH
        } 

        return next.handle(req).pipe( catchError(err => this.handleError(err)) );
    }
    
    private addTokenToHeaders(req) {
        const accessToken = this.getToken().access_token;
        
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.removeToken();
            console.log(err.message);
            return of(err.message);
        } 
        // handle auth error or rethrow
        return throwError(err);
    }


    // HANDLE TOKEN
    private getToken() {
        return JSON.parse(localStorage.getItem('accessToken'));
    }

    private persistToken(accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
    }

    private removeToken() {
        localStorage.removeItem('accessToken');
    }

    private tokenIsValid() {
        if (this.getToken()) {
            return this.getToken().expires < Date.now();
        }
        return false;
    }
}