import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import { filter, takeUntil } from 'rxjs/operators';

import { CartItem, ItemRequest } from '@app/shared/models/cart';

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
	) {
		super();
	}

	ngOnInit() {
		this.initCartItems();
	}

	// load cart items
	initCartItems() {
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
			});
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
