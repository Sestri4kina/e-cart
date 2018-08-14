import { Injectable } from "@angular/core";
import { ConfigService } from "@app/shared/config/config.service";


interface CartReference {
    value: string;
    created_at: number;
    modified_at: number;
}

@Injectable()
export class CartUtilsService {
    timeCartIsValid: number;

    constructor(
        private config: ConfigService
    ) {
        this.timeCartIsValid = this.config.timeCartIsValid;
    }

    generateCartRefValue(): string {
        return (Math.random() * Math.pow(10, 16)).toString(36);
    }

    createCartRef(): void {
        const created_at = Date.now(), 
            modified_at = Date.now(),
            value = this.generateCartRefValue();

        const cartReference: CartReference = {
            value,
            created_at,
            modified_at
        };

        localStorage.setItem("cart_ref", JSON.stringify(cartReference));
    }

    updateCartRef(): void {
        let cartReference = this.cartRefObject();

        cartReference = { ...cartReference, modified_at: Date.now() };
        localStorage.setItem("cart_ref", JSON.stringify(cartReference));
    }

    cartRef(): string {
        return (JSON.parse(localStorage.getItem("cart_ref")) as CartReference).value;
    }

    isCartRefValid(): boolean {
        if (!!this.cartRefObject()) {
            const cartReference = this.cartRefObject();

            const modified_at = cartReference.modified_at;
            const now = Date.now();

            return now - modified_at < this.timeCartIsValid;
        }
        return false;
    }


    cartRefObject(): CartReference {
        return JSON.parse(localStorage.getItem("cart_ref"));
    }

}
