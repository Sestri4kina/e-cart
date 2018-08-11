import { Action } from '@ngrx/store';
import { Cart, ItemRequest, RemoveCartResponse, CartItems, CartItem } from '@app/shared/models/cart';


export enum CartActionTypes {
    GetCart = '[Cart] Get',
    GetCartSuccess = '[Cart] Get Success',
    GetCartFail = '[Cart] Get Fail',

    ClearCart = '[Cart] Clear',
    ClearCartSuccess = '[Cart] Clear Success',
    ClearCartFail = '[Cart] Clear Fail',

    AddItem = '[Cart] Add Item to Cart',
    AddItemSuccess = '[Cart] Add Item to Cart Success',
    AddItemFail = '[Cart] Add Item to Cart Fail',

    RemoveItem = '[Cart] Remove Item',
    RemoveItemSuccess = '[Cart] Remove Item Success',
    RemoveItemFail = '[Cart] Remove Item Fail',

    UpdateItem = '[Cart] Update Item',
    UpdateItemSuccess = '[Cart] Update Item Success',
    UpdateItemFail = '[Cart] Update Item Fail',

    LoadItems = '[Cart] Load Cart Items',
    LoadItemsSuccess = '[Cart] Load Success',
    LoadItemsFail = '[Cart] Load Fail',
}

/*
* Get Cart Actions
*/
export class GetCart implements Action {
    readonly type = CartActionTypes.GetCart;
  }
  
  export class GetCartSuccess implements Action {
    readonly type = CartActionTypes.GetCartSuccess;
  
    constructor(public payload: { cart: Cart }) {}
  }
  
  export class GetCartFail implements Action {
    readonly type = CartActionTypes.GetCartFail;
  
    constructor(public payload: any) {}
  }

/*
* Clear Cart Actions
*/
export class ClearCart implements Action {
    readonly type = CartActionTypes.ClearCart;
}

export class ClearCartSuccess implements Action {
    readonly type = CartActionTypes.ClearCartSuccess;
}

export class ClearCartFail implements Action {
    readonly type = CartActionTypes.ClearCartFail;

    constructor(public payload: any) {}
}

/*
 * Add Item to Cart Actions
 */
export class AddItem implements Action {
  readonly type = CartActionTypes.AddItem;

  constructor(public payload: { itemParams: ItemRequest}) {}
}

export class AddItemSuccess implements Action {
  readonly type = CartActionTypes.AddItemSuccess;

  constructor(public payload: { items: CartItems }) {}
}

export class AddItemFail implements Action {
  readonly type = CartActionTypes.AddItemFail;

  constructor(public payload: any) {}
}

/*
 * Remove Item from Cart Actions
 */
export class RemoveItem implements Action {
  readonly type = CartActionTypes.RemoveItem;

  constructor(public payload: { itemId: string }) {}
}

export class RemoveItemSuccess implements Action {
  readonly type = CartActionTypes.RemoveItemSuccess;

  constructor(public payload: { items: CartItems }) {}
}

export class RemoveItemFail implements Action {
  readonly type = CartActionTypes.RemoveItemFail;

  constructor(public payload: any) {}
}

/*
* Update Item in Cart Actions
*/
export class UpdateItem implements Action {
    readonly type = CartActionTypes.UpdateItem;

    constructor(public payload: { itemParams: ItemRequest }) {}
}

export class UpdateItemSuccess implements Action {
    readonly type = CartActionTypes.UpdateItemSuccess;

    constructor(public payload: { item:  CartItem }) {}
}

export class UpdateItemFail implements Action {
    readonly type = CartActionTypes.UpdateItemFail;

    constructor(public payload: any) {}
}

/*
 * Load Items Actions
 */
export class LoadItems implements Action {
  readonly type = CartActionTypes.LoadItems;
}

export class LoadItemsSuccess implements Action {
  readonly type = CartActionTypes.LoadItemsSuccess;

  constructor(public payload: { items:  CartItems }) {}
}

export class LoadItemsFail implements Action {
  readonly type = CartActionTypes.LoadItemsFail;

  constructor(public payload: any) {}
}

export type CartActions =
    GetCart
    | GetCartSuccess
    | GetCartFail

    | ClearCart
    | ClearCartSuccess
    | ClearCartFail

    | AddItem
    | AddItemSuccess
    | AddItemFail

    | RemoveItem
    | RemoveItemSuccess
    | RemoveItemFail

    | UpdateItem
    | UpdateItemSuccess
    | UpdateItemFail

    | LoadItems
    | LoadItemsSuccess
    | LoadItemsFail;
