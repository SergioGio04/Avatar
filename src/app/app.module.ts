import { NgModule } from '@angular/core';
import { IProductService } from './interfaces/i-product-service';
import { CustomProductServiceService } from './services/custom-product-service.service';

@NgModule({
  imports: [],
  providers: [
    { 
      provide: IProductService, 
      useClass: CustomProductServiceService
    }
  ],
})
export class AppModule {}