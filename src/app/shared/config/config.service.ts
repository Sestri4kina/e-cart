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
}