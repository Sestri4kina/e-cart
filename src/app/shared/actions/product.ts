import { Action } from '@ngrx/store';
import { Products } from '@app/shared/models/product';

export enum ProductActionTypes {
  Load = '[Products] Load',
  LoadSuccess = '[Products] Load Success',
  LoadFailure = '[Products] Load Failure',
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
  }
  
  export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
  
    constructor(public payload: { products: Products }) {}
  }
  
  export class LoadFailure implements Action {
    readonly type = ProductActionTypes.LoadFailure;
  
    constructor(public payload: any) {}
  }
  
  export type ProductActions =
    | Load
    | LoadSuccess
    | LoadFailure;