import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RemoteAPIModule } from '@app/shared/services/remote-api/remote-api.module';

import { CartRoutingModule } from '@app/cart/cart-routing.module';
import { CART_CONTAINERS } from '@app/cart/containers';


@NgModule({
  imports: [
    CommonModule,
    RemoteAPIModule,
    CartRoutingModule,
  ],
  declarations: [ ...CART_CONTAINERS],
  providers: [],
})
export class CartModule { }