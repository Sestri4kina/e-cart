import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import { CartUtilsService } from '@app/shared/services/utils/cart-utils.service';
import { CartItem, ItemRequest } from '@app/shared/models/cart';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { filter, takeUntil, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends BaseComponent implements OnInit {
  cartItems: Array<CartItem>;
  removeIconPath: string = "assets/images/icons/remove.svg";
  total: string;


  constructor(
    private store: Store<fromRoot.State>,
    private cartUtilsService: CartUtilsService,
  ) { 
    super();
  }

  ngOnInit() {
    this.initCartItems();
  }

// load cart items
  initCartItems() {
    if ( this.cartUtilsService.isCartRefValid() ) {
      
      this.store.dispatch(new cartAction.LoadCartItems());

      this.store.select(state => state.cart)
        .pipe(
          filter(_ => !!_.cartItems),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(cartState => {
          console.log(cartState);
          this.cartItems = cartState.cartItems.data;
          this.total = cartState.cartItems.meta.display_price.with_tax.formatted;
        })

    } else {
      this.store.dispatch(new cartAction.GetCart());

      this.store.select(state => state.cart)
        .pipe(
          filter(_ => !!_.cart),
          takeUntil(this.unsubscribe$),
          flatMap(_cartState => {
            console.log(_cartState);

            this.store.dispatch(new cartAction.LoadCartItems());
            return this.store.select(state => state.cart.cartItems)
          }),
          takeUntil(this.unsubscribe$),
        )
        .subscribe(items => {
          console.log(items);
        })
      }
  }

// update items's quantity in cart
  updateQuantity(newQuantity: number, itemId: string) {
    let itemParams: ItemRequest = {
      quantity: newQuantity,
      id: itemId,
      type: "cart_item"
    };

    this.store.dispatch(new cartAction.UpdateItem({ itemParams }));
  }

// remove all items from cart
  clearCart() {
    this.store.dispatch(new cartAction.ClearCart());
  }

// remove specific item from cart
  removeItem(itemId: string) {
    this.store.dispatch(new cartAction.RemoveItem({ itemId }));
  }

}
