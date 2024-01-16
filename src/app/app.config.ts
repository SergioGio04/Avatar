import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FirstServiceService } from './first-service.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  //gli passo il importProvidersFrom(HttpClientModule) per utilizzare l'Http client globalmente
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule, FirstServiceService)],
};
