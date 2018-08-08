import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '@app/cart/containers/cart.component';

const cartRoutes: Routes = [
  { 
    path: 'cart',
    component: CartComponent 
  }
];
 
@NgModule({
  imports: [ 
    RouterModule.forChild(cartRoutes)
   ],
  exports: [ 
    RouterModule
  ]
})
export class CartRoutingModule {}