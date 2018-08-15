import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  
  numberOfProductsInCart$: Observable<number>;
  isSidebarOpen: boolean = false;
  burgerMenuPath = "/assets/images/menu_mob.svg";

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
    this.store.dispatch(new cartAction.LoadCartItems());

    this.numberOfProductsInCart$ = this.store.select(state => state.cart.numberOfProductsInCart)
                                            .pipe(filter(_ => !!_));      
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
