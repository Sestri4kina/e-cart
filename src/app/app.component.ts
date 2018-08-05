import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as authAction from '@app/shared/actions/auth';
import * as productAction from '@app/shared/actions/product';
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor ( 
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {

    //test
    this.store.select(s => s.auth)
        .pipe(
            filter(_ => !!_.hasAccessToken)
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
        filter(_ => !!_.products)
      )
      .subscribe(data => {
        console.log(data);
      });
  }

}
