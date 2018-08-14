import { Action } from '@ngrx/store';
import { ProductWithImage } from '@app/shared/models/product';

export enum ProductActionTypes {
  LoadProducts = '[Products] Load Products',
  LoadProductsSuccess = '[Products] Load Products Success',
  LoadProductsFail = '[Products] Load Products Fail',
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LoadProducts;
  }
  
  export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LoadProductsSuccess;
  
    constructor(public payload: { products: Array<ProductWithImage> }) {}
  }
  
  export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LoadProductsFail;
  
    constructor(public payload: any) {}
  }
  
  export type ProductActions =
    LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail;