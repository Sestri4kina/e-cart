import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ConfigService } from '@app/shared/config/config.service';
import { Products } from '@app/shared/models/product';


@Injectable()
export class ProductAPIService {
  constructor(
    private config: ConfigService,
    private httpService: GenericHttpService,
  ) {}

  getProducts(): Observable<Products> {
    return this.httpService.get(`${this.config.productsPath}`);
  }

}