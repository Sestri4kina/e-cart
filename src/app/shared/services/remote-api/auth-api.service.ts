import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ConfigService } from '@app/shared/config/config.service';
import { AccessToken } from '@app/shared/models/access-token';

@Injectable()
export class AuthAPIService {
  constructor(
    private config: ConfigService,
    private httpService: GenericHttpService,
  ) {}

    getAccessToken(): Observable<AccessToken> {
        let formData = new URLSearchParams();
        formData.set('client_id', this.config.client_id);
        formData.set('grant_type', 'implicit');

        return this.httpService.postFormData(`${this.config.accessTokenPath}`, formData.toString());
    }
}
