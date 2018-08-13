import { Injectable } from '@angular/core';
import { AccessToken } from '@app/shared/models/access-token';

@Injectable()
export class HandleTokenService {
    
        isToken(): boolean {
            return !!JSON.parse(localStorage.getItem('accessToken'));
        }

        getToken(): string {
            return (JSON.parse(localStorage.getItem('accessToken')) as AccessToken).access_token;
        }

        tokenExpiresAt(): number {
            return (JSON.parse(localStorage.getItem('accessToken')) as AccessToken).expires * 1000;
        }

        tokenIsValid(): boolean {
            if (this.isToken()) {
                return this.tokenExpiresAt() > Date.now();
            }
            return false;
        }
    
        persistToken(accessToken: AccessToken): void {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
    
        removeToken(): void {
            localStorage.removeItem('accessToken');
        }
}
