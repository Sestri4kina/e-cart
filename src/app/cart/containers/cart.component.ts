import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CartItem, ItemRequest } from '@app/shared/models/cart';
import { HandleErrorService } from '@app/shared/services/utils/handle-error.service';


@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
})
export class CartComponent extends BaseComponent implements OnInit {

	cartItems$: Observable<Array<CartItem>>;
	cartTotal$: Observable<string>;
	error$: Observable<string>;

	removeIconPath: string = "assets/images/icons/remove.svg";
	
	constructor(
		private store: Store<fromRoot.State>,
		private handleError: HandleErrorService
	) {
		super();
	}

	ngOnInit() {
		this.initCart();
		this.error$ = this.handleError.handleCartErrors();
	}

	// load cart items
	initCart() {
		this.store.dispatch(new cartAction.LoadCartItems());

		this.cartItems$ = this.store
								.select(state => state.cart.cartItems)
								.pipe(
									filter(_ => !!_),
									map(_cartItems => _cartItems.data)
								);

		this.cartTotal$ =  this.store
								.select(state => state.cart.cartTotal)
								.pipe(filter(_ => !!_));
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
