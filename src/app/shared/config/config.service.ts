import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
  })
export class ConfigService {
    // WRITE ENV VARS FROM HEROKU CONFIG VARS
    //basePath: string = environment.apiURL;
    //client_id: string = environment.moltinClientId;
    basePath: string = "https://api.moltin.com";
    client_id: string = "IvSweUpOW5OSrmVitHQmH09oSnTTkQcfhB7ZSHjYoc";
    productsPath: string = "v2/products";
    accessTokenPath: string = "oauth/access_token";
    cartPath = (cartRef: string) => `v2/carts/${cartRef}`;
    cartItemsPath = (cartRef: string) => `v2/carts/${cartRef}/items`;
    cartItemPath = (cartRef: string, itemId: string) => `v2/carts/${cartRef}/items/${itemId}`;

    // cart reference is valid for 7 days since last update
    // 7 days minus 5 minutes
    timeCartIsValid: number = 7 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000 ; 
}