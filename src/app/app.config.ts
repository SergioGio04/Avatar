import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ProductServiceService } from './product/product-service.service';
import { CategoryServiceService } from './category/category-service.service';
import { routes } from './app.routes';


/*
-componente list
-componente dettaglio che unisce add/ update-delete
(sulla base del routing  0= add, id= tutto il resto)


Studia(integrazione dei moduli in standAlone)
e cosa sono
*/

export const appConfig: ApplicationConfig = {
  //gli passo il importProvidersFrom(HttpClientModule) per utilizzare l'Http client globalmente
  providers: [      
      provideRouter(routes),   
      importProvidersFrom(            
        [ 
          HttpClientModule, 
          ProductServiceService,
          CategoryServiceService       
        ]
      ),
  ],
};
