import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@app/shared/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';

import { RemoteAPIModule } from '@app/shared/services/remote-api/remote-api.module';
import { AuthInterceptor } from '@app/shared/services/auth-interceptor.service';
import { AuthEffects } from '@app/shared/effects/auth';
import { ProductEffects } from '@app/shared/effects/product';
import { UtilsModule } from '@app/shared/services/utils/utils.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RemoteAPIModule.forRoot(),
    UtilsModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
