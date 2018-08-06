import { Injectable } from '@angular/core';

@Injectable()
export class HandleTokenService {
    
        getToken() {
            return JSON.parse(localStorage.getItem('accessToken'));
        }

        tokenIsValid() {
            if (this.getToken()) {
                return this.getToken().expires * 1000 > Date.now();
            }
            return false;
        }
    
        persistToken(accessToken) {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
    
        removeToken() {
            localStorage.removeItem('accessToken');
        }
}
