import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as productAction from '@app/shared/actions/product';
import * as cartAction from '@app/shared/actions/cart';

import { filter, takeUntil } from "rxjs/operators";
import { Product, ProductWithImage } from '@app/shared/models/product';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ProductUtilsService } from '@app/shared/services/utils/product-utils.service';
import { ItemRequest } from '@app/shared/models/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  products: Array<ProductWithImage>;

  constructor ( 
    private store: Store<fromRoot.State>,
    private productUtilsService: ProductUtilsService,
  ) {
    super();
  }

  ngOnInit() {
    this.initProducts();
  }

  addToCart(itemId) {
    const itemParams: ItemRequest = {
      quantity: 1,
      type: "cart_item",
      id: itemId
    };

    this.store.dispatch( new cartAction.AddItem({ itemParams }));
  }

  initProducts() {
    this.store.dispatch(new productAction.Load());

    this.store.select(s => s.product)
      .pipe(
        filter(_ => !!_.products),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((productState) => {
        console.log(productState);
        this.products = this.productUtilsService.composeProductArray(productState.products.data, productState.products.included.main_images);
        console.log(this.products);
      });
  }

}
