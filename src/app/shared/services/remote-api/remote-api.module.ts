import { NgModule, ModuleWithProviders } from '@angular/core';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ProductAPIService } from '@app/shared/services/remote-api/product-api.service';
import { CartAPIService } from '@app/shared/services/remote-api/cart-api.service';
import { AuthAPIService } from '@app/shared/services/remote-api/auth-api.service';


@NgModule({})
export class RemoteAPIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RemoteAPIModule,
      providers: [
        GenericHttpService,
        ProductAPIService,
        CartAPIService,
        AuthAPIService
      ]
    };
  }
}