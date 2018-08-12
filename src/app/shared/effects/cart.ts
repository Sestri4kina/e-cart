import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { CartActionTypes, LoadCartItemsSuccess, LoadCartItemsFail, 
    GetCartSuccess, GetCartFail, 
    AddItemSuccess, AddItemFail, AddItem, 
    RemoveItem, RemoveItemSuccess, RemoveItemFail, 
    ClearCartSuccess, ClearCartFail, ClearCart, UpdateItem, UpdateItemSuccess, UpdateItemFail } from '@app/shared/actions/cart';
import { CartAPIService } from '@app/shared/services/remote-api/cart-api.service';
import { CartUtilsService } from '@app/shared/services/utils/cart-utils.service';
import { CartItems, Cart, ItemRequest } from '@app/shared/models/cart';



@Injectable()
export class CartEffects {
    cartRef: string;
    isCartRefValid: boolean;

    @Effect()
    getCart$ = this.actions$.pipe(
        ofType(CartActionTypes.GetCart),
        switchMap(() => {
            return this.cartAPIService
                        .getCart(this.cartRef)
                        .pipe(
                            map((cart: Cart) => new GetCartSuccess({ cart })),
                            catchError(error => of(new GetCartFail(error)))
                        )
            }
        )
    );

    @Effect()
    getCartItems$ = this.actions$.pipe(
        ofType(CartActionTypes.LoadCartItems),
        switchMap(() => {
            return this.cartAPIService
                        .getCartItems(this.cartRef)
                        .pipe(
                            map((items: CartItems) => new LoadCartItemsSuccess({ items })),
                            catchError(error => of(new LoadCartItemsFail(error)))
                        )
            }
        )
    );

    @Effect()
    addItemToCart$ = this.actions$.pipe(
        ofType(CartActionTypes.AddItem),
        map((action: AddItem) => action.payload.itemParams),
        switchMap((itemParams: ItemRequest) => {
            return this.cartAPIService
                        .addItemToCart(itemParams, this.cartRef)
                        .pipe(
                            map((items: CartItems) => new AddItemSuccess({ items })),
                            catchError(error => of(new AddItemFail(error)))
                        )
            }
        )
    );


    @Effect()
    removeItem$ = this.actions$.pipe(
        ofType(CartActionTypes.RemoveItem),
        map((action: RemoveItem) => action.payload),
        switchMap((itemId: string) => {
            return this.cartAPIService
                        .removeItem(itemId, this.cartRef)
                        .pipe(
                            map((items: CartItems) => new RemoveItemSuccess({ items })),
                            catchError(error => of(new RemoveItemFail(error)))
                        )
            }
        )
    );

    @Effect()
    clearCart$ = this.actions$.pipe(
        ofType(CartActionTypes.ClearCart),
        switchMap(() => {
            return this.cartAPIService
                        .clearCart(this.cartRef)
                        .pipe(
                            map(() => new ClearCartSuccess()),
                            catchError(error => of(new ClearCartFail(error)))
                        )
            }
        )
    );

    @Effect()
    updateItem$ = this.actions$.pipe(
        ofType(CartActionTypes.UpdateItem),
        map((action: UpdateItem) => action.payload.itemParams),
        switchMap((itemParams: ItemRequest) => {
            console.log(itemParams);
            return this.cartAPIService
                        .updateItem(itemParams, this.cartRef)
                        .pipe(
                            map((items: CartItems) => new UpdateItemSuccess({ items })),
                            catchError(error => of(new UpdateItemFail(error)))
                        )
            }
        )
    );

    constructor(
        private actions$: Actions,
        private cartAPIService: CartAPIService,
        private cartUtilsService: CartUtilsService,
    ) {
        this.isCartRefValid = this.cartUtilsService.isCartRefValid();

        if (this.isCartRefValid) {
            this.cartRef = this.cartUtilsService.cartRef();
        } else {
            this.cartRef = this.cartUtilsService.generateCartReference();
            this.cartUtilsService.persistCartReference(this.cartRef);
        }
    }

}
