import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ConfigService } from '@app/shared/config/config.service';
import { ItemRequest, CartItems } from '@app/shared/models/cart';


@Injectable()
export class CartAPIService {
  constructor(
    private config: ConfigService,
    private httpService: GenericHttpService,
  ) {}

  getCart(cartRef: string): Observable<CartItems> {
    return this.httpService.get(this.config.cartPath(cartRef));
  }

  getCartItems(cartRef: string): Observable<CartItems> {
    return this.httpService.get(this.config.cartItemsPath(cartRef));
  }

  addItemToCart(itemParams: ItemRequest, cartRef: string): Observable<CartItems> {
    return this.httpService.post(this.config.cartItemsPath(cartRef), { data: itemParams });
  }

  updateItem(itemParams: ItemRequest, cartRef: string): Observable<CartItems> {
    return this.httpService.put(this.config.cartItemPath(cartRef, itemParams.id), { data: itemParams });
  }

  removeItem(itemId: string, cartRef: string): Observable<CartItems> {
    return this.httpService.delete(this.config.cartItemPath(cartRef, itemId));
  }

  clearCart(cartRef: string): Observable<CartItems> {
    return this.httpService.delete(this.config.cartPath(cartRef));
  }
}