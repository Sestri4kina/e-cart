import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ProductActionTypes, LoadSuccess, LoadFailure } from '@app/shared/actions/product';
import { ProductAPIService } from '@app/shared/services/remote-api/product-api.service';
import { Products } from '@app/shared/models/product';


@Injectable()
export class ProductEffects {

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    switchMap(() =>
      this.productService
        .getProducts()
        .pipe(
          map((products: Products) => new LoadSuccess({ products })),
          catchError(error => of(new LoadFailure(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductAPIService
  ) {}
}