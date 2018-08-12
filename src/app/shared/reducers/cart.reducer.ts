import { CartActions, CartActionTypes } from "@app/shared/actions/cart";
import { CartItems, Cart } from "@app/shared/models/cart";


export interface State {
    cartItems: CartItems;
    cart: Cart;
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    cartItems: null,
    cart: null,
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
            return {
              ...state,
              cartItems: action.payload.items,
              error: null,
              isLoading: false,
            };
        }

        case CartActionTypes.AddItemSuccess: {
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: action.payload.items
            };
        }

        case CartActionTypes.RemoveItemSuccess: {
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: action.payload.items
            };
        }

        case CartActionTypes.ClearCartSuccess: {
            let updatedCartItems = { ...state.cartItems };
            updatedCartItems.data = [];

            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: updatedCartItems
            };
        }

        case CartActionTypes.UpdateItemSuccess: {
            return {
              ...state,
              error: null,
              isLoading: false,
              cartItems: action.payload.items
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
