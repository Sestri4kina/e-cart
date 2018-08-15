import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as productAction from '@app/shared/actions/product';
import * as cartAction from '@app/shared/actions/cart';
import { filter} from "rxjs/operators";
import { Observable } from 'rxjs';

import { ProductWithImage } from '@app/shared/models/product';
import { ItemRequest } from '@app/shared/models/cart';

import { HandleErrorService } from '@app/shared/services/utils/handle-error.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  products$: Observable<Array<ProductWithImage>>;
  cartError$: Observable<string>;
  productError$: Observable<string>;

  constructor ( 
    private store: Store<fromRoot.State>,
    private handleError: HandleErrorService
  ) {
    super();
  }

  ngOnInit() {
    this.initProducts();
    this.cartError$ = this.handleError.handleCartErrors();
    this.productError$ = this.handleError.handleProductErrors();
  }

  addToCart(itemId: string) {
    const itemParams: ItemRequest = {
      quantity: 1,
      type: "cart_item",
      id: itemId
    };

    this.store.dispatch( new cartAction.AddItem({ itemParams }));
  }

  initProducts() {
    this.store.dispatch(new productAction.LoadProducts());

    this.products$ = this.store
                          .select(state => state.product.products)
                          .pipe(filter(_ => !!_))
  }

}
