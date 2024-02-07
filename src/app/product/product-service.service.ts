import { ImportProvidersSource, Injectable, Injector } from '@angular/core';
import { Product } from './product';
import { ServiceBase } from '../abstracts/service-base-service';
import { Category } from '../category/category';
import { Query, getCountFromServer, query, where } from 'firebase/firestore';
import { BaseParams } from '../abstracts/base-params';
import { ProductParamsModel } from './models/product-params-model';

@Injectable({ providedIn: 'root' })
export class ProductServiceService extends ServiceBase<Product, ProductParamsModel> {

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
  
    if( dynamicParam?.categoryId!= undefined && dynamicParam?.categoryId!= null && dynamicParam?.categoryId!="0" ){
      q = query(q, where("categoryId", "==", dynamicParam?.categoryId ) );
      //return [q, await this.getRunTimeCountElementsDB(q)];
      return q;
    }    
    //return [q,undefined];
    return q;

  }
  

}
