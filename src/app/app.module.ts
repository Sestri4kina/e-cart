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
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { FooterComponent } from '@app/shared/components/footer/footer.component';
import { HomeComponent } from '@app/home/home.component';
import { CartEffects } from '@app/shared/effects/cart';
import { PipeModule } from '@app/shared/pipes/pipe.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductEffects,
      CartEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RemoteAPIModule.forRoot(),
    UtilsModule.forRoot(),
    PipeModule,
    AppRoutingModule
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
