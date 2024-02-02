import { ImportProvidersSource, Injectable, Injector } from '@angular/core';
import { Product } from './product';
import { ServiceBase } from '../abstracts/service-base-service';
import { Category } from '../category/category';


@Injectable({ providedIn: 'any' })

export class ProductServiceService extends ServiceBase<Product> {


  constructor(injector: Injector) { 
    super(injector)
  }

  getNameCollection(): string {
    return "products";
  }
  getModelInstance(json?: any): Product {
    return new Product(json);
  }  

}
