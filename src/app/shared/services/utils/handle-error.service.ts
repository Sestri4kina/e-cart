import { Injectable } from "@angular/core";

import { Store } from '@ngrx/store';
import * as fromRoot from '@app/shared/reducers';
import * as cartAction from '@app/shared/actions/cart';
import * as productAction from '@app/shared/actions/product';
import { filter, takeUntil, map } from 'rxjs/operators';

import { BaseComponent } from "@app/shared/components/base/base.component";

@Injectable()
export class HandleErrorService extends BaseComponent {

    constructor(
        private store: Store<fromRoot.State>
    ) { 
        super();
    }

    handleCartErrors() {
        return this.store.select(state => state.cart.error)
                    .pipe(
                        map(errorObject => this.formErrorMessage(errorObject)),
                        takeUntil(this.unsubscribe$)
                    )
    }

    handleProductErrors() {
        return this.store.select(state => state.product.error)
                    .pipe(
                        map(errorObject => this.formErrorMessage(errorObject)),
                        takeUntil(this.unsubscribe$)
                    )
    
    }

    private formErrorMessage(errorObject): string | null {
        if (!!errorObject) {
            const error = errorObject.errors[0];
            return error.detail ? error.detail : error.title;
        } 
        return null;
    }
}