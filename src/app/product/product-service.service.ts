import { ImportProvidersSource, Injectable, Injector } from '@angular/core';
import { Product } from './product';
import { ServiceBase } from '../abstracts/service-base-service';
import { Category } from '../category/category';
import { Query, getCountFromServer, query, where } from 'firebase/firestore';
import { ProductParamsModel } from './models/product-params-model';
import { BridgeCategoryService } from '../abstracts/bridge-category.service';

@Injectable({ providedIn: 'root' })
export class ProductServiceService extends BridgeCategoryService<Product, ProductParamsModel> {

  constructor( injector: Injector) { 
    super(injector);
  }

  getNameCollection(): string {
    return "products";
  }
  getModelInstance(json?: any): Product {
    return new Product(json);
  }  

  override async getAdditionalQuery(q:Query, dynamicParam?: ProductParamsModel): Promise<Query>{
    q= await super.getAdditionalQuery(q, dynamicParam);
    return q;

  }
  

}
