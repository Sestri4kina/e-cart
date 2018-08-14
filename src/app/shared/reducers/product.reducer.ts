import { ProductActions, ProductActionTypes } from "@app/shared/actions/product";
import { ProductWithImage } from "@app/shared/models/product";

export interface State {
    products: Array<ProductWithImage>;
    isLoading: boolean;
    error: any;
}

const initialState: State = {
    products: null,
    isLoading: false,
    error: null
}


export function reducer(state = initialState, action: ProductActions): State {
    switch (action.type) { 
        case ProductActionTypes.LoadProducts: {
            return {
              ...state,
              error: null,
              isLoading: true,
            };
        }

        case ProductActionTypes.LoadProductsSuccess: {
            return {
              ...state,
              products: action.payload.products,
              error: null,
              isLoading: false,
            };
          }
      
        case ProductActionTypes.LoadProductsFail: {
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

export const getProducts = (state: State) => state.products;
export const getError = (state: State) => state.error;
