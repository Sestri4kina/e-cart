import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@app/shared/config/config.service';

@Injectable()
export class GenericHttpService {

  private apiPath: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiPath = this.config.basePath;
  }

  post(path: string, body: Object = {}): Observable<any> {
    const fullPath: string = `${this.apiPath}/${path}`;
  
    return this.http.post(fullPath, body);
  }

  postFormData(path: string, formData): Observable<any> {
    const fullPath: string = `${this.apiPath}/${path}`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    return this.http.post(fullPath, formData, { headers });
  }

  patch(path: string, params: Object = {}) {
    const fullPath: string = `${this.apiPath}/${path}`;

    return this.http.patch(fullPath, params);
  }

  get(path: string, searchParams: Object = {}): Observable<any> {
    const fullPath: string = `${this.apiPath}/${path}`;
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Accept', 'application/json');
    
    Object.keys(searchParams).forEach(key => {
      params = params.append(key, searchParams[key]);
    });

    return this.http.get(fullPath, { headers, params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    const fullPath: string = `${this.apiPath}/${path}`;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8").set('Accept', 'application/json');

    return this.http.put(fullPath, body, { headers });
  }
}