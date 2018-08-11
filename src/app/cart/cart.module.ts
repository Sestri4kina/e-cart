import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RemoteAPIModule } from '@app/shared/services/remote-api/remote-api.module';

import { CartRoutingModule } from '@app/cart/cart-routing.module';
import { CART_CONTAINERS } from '@app/cart/containers';
import { PipeModule } from '@app/shared/pipes/pipe.module';
import { CART_COMPONENTS } from '@app/cart/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RemoteAPIModule,
    CartRoutingModule,
    FormsModule,
    PipeModule
  ],
  declarations: [ ...CART_CONTAINERS, ...CART_COMPONENTS],
  providers: [],
})
export class CartModule { }