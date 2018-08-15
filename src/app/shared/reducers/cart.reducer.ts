import { CartActions, CartActionTypes } from "@app/shared/actions/cart";
import { CartItems, Cart, CartItem } from "@app/shared/models/cart";


export interface State {
    cartItems: CartItems;
    cart: Cart;
    cartTotal: string;
    numberOfProductsInCart: number;
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    cartItems: null,
    cart: null,
    cartTotal: null,
    numberOfProductsInCart: null,
    isLoading: false,
    error: null
}


export function reducer(state = initialState, action: CartActions): State {
    switch (action.type) { 
        case CartActionTypes.GetCart: {
            return {
              ...state,
              error: null,
              isLoading: true,
            };
        }

        case CartActionTypes.GetCartSuccess: {
            return {
              ...state,
              cart: action.payload.cart,
              error: null,
              isLoading: false,
            };
        }

        case CartActionTypes.LoadCartItems: {
            return {
              ...state,
              error: null,
              isLoading: true,
            };
        }

        case CartActionTypes.LoadCartItemsSuccess: {
            const items = action.payload.items;
            const total = items.meta.display_price.with_tax.formatted;
            const numberOfProducts = items.data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
            return {
              ...state,
              cartItems: items,
              cartTotal: total,
              numberOfProductsInCart: numberOfProducts,
              error: null,
              isLoading: false,
            };
        }

        case CartActionTypes.AddItemSuccess: {
            const items = action.payload.items;
            const total = items.meta.display_price.with_tax.formatted;
            const numberOfProducts = items.data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: items,
              cartTotal: total,
              numberOfProductsInCart: numberOfProducts
            };
        }

        case CartActionTypes.RemoveItemSuccess: {
            const items = action.payload.items;
            const total = items.meta.display_price.with_tax.formatted;
            const numberOfProducts = items.data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: items,
              cartTotal: total,
              numberOfProductsInCart: numberOfProducts
            };
        }

        case CartActionTypes.ClearCartSuccess: {
            let updatedCartItems = { ...state.cartItems };
            updatedCartItems.data = [];

            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: updatedCartItems,
              cartTotal: null,
              numberOfProductsInCart: null
            };
        }

        case CartActionTypes.UpdateItemSuccess: {
            const items = action.payload.items;
            const total = items.meta.display_price.with_tax.formatted;
            const numberOfProducts = items.data.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: items,
              cartTotal: total,
              numberOfProductsInCart: numberOfProducts
            };
        }
      
        case CartActionTypes.LoadCartItemsFail: 
        case CartActionTypes.GetCartFail:
        case CartActionTypes.AddItemFail:
        case CartActionTypes.RemoveItemFail:
        case CartActionTypes.ClearCartFail:
        case CartActionTypes.UpdateItemFail:
        {
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        }
    
        default: {
            return state;
        }
    }
}

export const getCart = (state: State) => state.cart;
export const getCartItems = (state: State) => state.cartItems;
export const getError = (state: State) => state.error;
export const getCartTotal = (state: State) => state.cartTotal;
export const getNumberOfProductsInCart = (state: State) => state.numberOfProductsInCart;
