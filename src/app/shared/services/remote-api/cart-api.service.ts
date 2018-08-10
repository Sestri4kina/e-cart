import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenericHttpService } from '@app/shared/services/remote-api/generic-http.service';
import { ConfigService } from '@app/shared/config/config.service';
import { ItemRequest } from '@app/shared/models/cart';


@Injectable()
export class CartAPIService {
  constructor(
    private config: ConfigService,
    private httpService: GenericHttpService,
  ) {}

  getCart(cartRef: string): Observable<any> {
    return this.httpService.get(this.config.cartPath(cartRef));
  }

  getCartItems(cartRef: string): Observable<any> {
    return this.httpService.get(this.config.cartItemsPath(cartRef));
  }

  addItemToCart(itemParams: ItemRequest, cartRef: string): Observable<any> {
    return this.httpService.post(this.config.cartItemsPath(cartRef), itemParams);
  }

  updateItem(itemParams: ItemRequest, cartRef: string): Observable<any> {
    return this.httpService.put(this.config.cartItemsPath(cartRef), itemParams);
  }

  removeItem(itemId: string, cartRef: string): Observable<any> {
    return this.httpService.delete(this.config.cartItemPath(cartRef, itemId));
  }

  deleteCart(cartRef: string): Observable<any> {
    return this.httpService.delete(this.config.cartPath(cartRef));
  }
}