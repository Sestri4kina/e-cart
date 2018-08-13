import { Injectable, Inject } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError} from "rxjs";

import { catchError } from "rxjs/operators";
import { HandleTokenService } from "@app/shared/services/utils/handle-token.service";
import { AuthAPIService } from "@app/shared/services/remote-api/auth-api.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private handleTokenService: HandleTokenService,
        private authAPIService: AuthAPIService,
        @Inject('window') private _window: Window,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        if (this.tokenIsValid() && this.isNotAuthPath(req.url)) {
            req = this.addTokenToHeaders(req);
        } 

        return next.handle(req).pipe( 
            catchError(err => {
                console.log(err.message);
                //handle reauth errors
                if ( err.status === 401 ) {
                    this.authAPIService.getAccessToken()
                        .subscribe(accessToken => {
                            this.handleTokenService.persistToken(accessToken);
                            //hacky-hacky way
                            this._window.location.reload();
                        })
                } 
                // handle other errors 
                return throwError(err);
            }) 
        );
    }
    
    private addTokenToHeaders(req) {
        const accessToken = this.getToken();
        
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    isNotAuthPath(url: string): boolean {
        return url !== "https://api.moltin.com/oauth/access_token";
    }

    private getToken(): string {
        return this.handleTokenService.getToken();
    }

    private tokenIsValid(): boolean {
        return this.handleTokenService.tokenIsValid();
    }

}
