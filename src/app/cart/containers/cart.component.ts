import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import { CartUtilsService } from '@app/shared/services/utils/cart-utils.service';
import { CartItem } from '@app/shared/models/cart';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { filter, takeUntil, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends BaseComponent implements OnInit {
  cartItems: Array<CartItem>;
  removeIconPath: string = "assets/images/icons/remove.svg";

  constructor(
    private store: Store<fromRoot.State>,
    private cartUtilsService: CartUtilsService,
  ) { 
    super();
  }

  ngOnInit() {
    console.log("Inside cart comp");

    this.getCartItems();
  }

  getCartItems() {
    if ( this.cartUtilsService.isCartRefValid() ) {
      
      this.store.dispatch(new cartAction.LoadItems());

      this.store.select(state => state.cart)
        .pipe(
          filter(_ => !!_.cartItems),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(cartState => {
          console.log(cartState);
          this.cartItems = cartState.cartItems.data;

        })

    } else {
      this.store.dispatch(new cartAction.GetCart());

      this.store.select(state => state.cart)
        .pipe(
          filter(_ => !!_.cart),
          takeUntil(this.unsubscribe$),
          flatMap(_cartState => {
            console.log(_cartState);

            this.store.dispatch(new cartAction.LoadItems());
            return this.store.select(state => state.cart.cartItems)
          }),
          takeUntil(this.unsubscribe$),
        )
        .subscribe(items => {
          console.log(items);
        })
      }
  }


  getQuantity(newQuantity) {
    console.log(newQuantity);
  }

  clearCart() {
    this.store.dispatch(new cartAction.ClearCart());
  }

  removeItem(itemId) {
    this.store.dispatch(new cartAction.RemoveItem(itemId));
  }

}
