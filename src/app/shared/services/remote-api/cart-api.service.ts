import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ConfigService } from '@app/shared/config/config.service';


@Injectable()
export class CartAPIService {
  constructor(
    private config: ConfigService,
    private httpService: GenericHttpService,
  ) {}

}