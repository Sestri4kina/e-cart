import { NgModule, ModuleWithProviders } from '@angular/core';

import { HandleTokenService } from '@app/shared/services/utils/handle-token.service';
import { ProductUtilsService } from '@app/shared/services/utils/product-utils.service';
import { CartUtilsService } from '@app/shared/services/utils/cart-utils.service';


@NgModule({})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UtilsModule,
      providers: [
        HandleTokenService,
        ProductUtilsService,
        CartUtilsService,
      ]
    };
  }
}