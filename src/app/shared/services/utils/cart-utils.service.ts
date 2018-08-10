import { Injectable } from "@angular/core";
import { ConfigService } from "@app/shared/config/config.service";

@Injectable()
export class CartUtilsService {
    constructor(
        private config: ConfigService
    ) {}

    generateCartReference(): string {
        return (Math.random() * Math.pow(10, 16)).toString(36);
    }

    persistCartReference(cartRef: string): void {
        const expiresAt = Date.now() + this.config.timeCartIsValid;
        const cartReference = {
            cartRef,
            expiresAt 
        };

        localStorage.setItem("cart_ref", JSON.stringify(cartReference));
    }

    cartRef(): string {
        return JSON.parse(localStorage.getItem("cart_ref")).cartRef;
    }

    cartRefExpiresAt(): number {
        return JSON.parse(localStorage.getItem("cart_ref")).expiresAt;
    }

    isCartRefValid(): boolean {
        return this.cartRefExpiresAt() < Date.now();
    }

    removeCartReference(): void {
        localStorage.removeItem("cart_ref");
    }

}
