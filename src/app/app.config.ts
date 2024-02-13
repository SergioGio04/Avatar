import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import { ProductServiceService } from './product/product-service.service';
import { CategoryServiceService } from './category/category-service.service';
import { routes } from './app.routes';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firstValueFrom, tap } from 'rxjs';
import { InitializerConfigService } from './services/initializer-config.service';
import { FirebaseManagerService } from './services/firebase-manager.service';


export function initializeApp(config: InitializerConfigService ) {
  //PUO RITORNARE ANCHE true
  return async() => await config.initializerCond();
}

export const appConfig: ApplicationConfig = {
  //gli passo il importProvidersFrom(HttpClientModule) per utilizzare l'Http client globalmente
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitializerConfigService],
      multi: true
    },
    provideRouter(routes),
    importProvidersFrom([
        HttpClientModule
    ]),
    //provideNoopAnimations(),
    provideAnimations(),

],
};
