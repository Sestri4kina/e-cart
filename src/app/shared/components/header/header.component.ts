import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';

import { filter, takeUntil, flatMap } from 'rxjs/operators';
import { CartItem } from '@app/shared/models/cart';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isSidebarOpen: boolean = false;
  burgerMenuPath = "/assets/images/menu_mob.svg";
  cartItems: Array<CartItem>;
  numberOfProductsInCart: number;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) { 
    super();
  }

  ngOnInit() {
    this.getNumberOfProductsInCart();
  }

  getNumberOfProductsInCart() {
    this.store.select(state => state.auth)
      .pipe(
        filter(_ => !!_.hasAccessToken),
        flatMap(_ => {
          this.store.dispatch(new cartAction.LoadCartItems());
          return this.store.select(state => state.cart);
        }),
        filter(_ => !!_.cartItems),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(cartState => {
          console.log(cartState);
          this.cartItems = cartState.cartItems.data;
          this.numberOfProductsInCart = this.cartItems
                                            .reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
        },
        err => {
          console.log(err);
        })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openLink(e: MouseEvent, linkUrl: string) {
    e.preventDefault();
    this.isSidebarOpen = false;
    this.router.navigateByUrl(linkUrl);
  }
}
