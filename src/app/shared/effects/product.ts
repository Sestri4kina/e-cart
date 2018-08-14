import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ProductActionTypes, LoadProductsSuccess, LoadProductsFail } from '@app/shared/actions/product';
import { ProductAPIService } from '@app/shared/services/remote-api/product-api.service';
import { ProductUtilsService } from '@app/shared/services/utils/product-utils.service';
import { Products } from '@app/shared/models/product';

@Injectable()
export class ProductEffects {

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(ProductActionTypes.LoadProducts),
    switchMap(() =>
      this.productAPIService
        .getProducts()
        .pipe(
          map((_products: Products) => {
            const products = this.productUtilsService.composeProductArray(_products.data, _products.included.main_images);
            return new LoadProductsSuccess({ products })
          }),
          catchError(error => of(new LoadProductsFail(error)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private productAPIService: ProductAPIService,
    private productUtilsService: ProductUtilsService
  ) {}
}