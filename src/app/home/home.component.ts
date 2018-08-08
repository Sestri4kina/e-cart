import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as productAction from '@app/shared/actions/product';

import { filter, takeUntil } from "rxjs/operators";
import { Product } from '@app/shared/models/product';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent implements OnInit {

  products: Array<Product>;

  constructor ( 
    private store: Store<fromRoot.State>
  ) {
    super();
  }

  ngOnInit() {
    //test
    this.store.select(s => s.auth)
        .pipe(
            filter(_ => !!_.hasAccessToken),
            takeUntil(this.unsubscribe$)
        )
        .subscribe(authState => {
            console.log(authState);
            this.initProducts();
        })
  }


  initProducts() {
    this.store.dispatch(new productAction.Load());

    this.store.select(s => s.product)
      .pipe(
        filter(_ => !!_.products),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((productsData) => {
        console.log(productsData);
        this.products = productsData.products.data;
      });
  }

}
