import { ImportProvidersSource, Injectable, Injector } from '@angular/core';
import { Product } from './product';
import { ServiceBase } from '../abstracts/service-base-service';
import { Category } from '../category/category';
import { Query, getCountFromServer, query, where } from 'firebase/firestore';
import { GetDynamicParams, GetDynamicParams as GetStaticParamsProduct } from '../abstracts/get-dynamic-params';
import { ProductParams } from './product-params';

@Injectable({ providedIn: 'root' })

export class ProductServiceService extends ServiceBase<Product> {

  //categoryId?:string|number;

  constructor(
    injector: Injector
  ) { 
    super(injector);
    console.log("OOOOO SONO PRODUCT SERVICE!");
  }


  getNameCollection(): string {
    return "products";
  }
  getModelInstance(json?: any): Product {
    return new Product(json);
  }  

  
  override async getAdditionalQuery(q:Query, dynamicParam: GetDynamicParams): Promise<[Query, number|undefined]>{
  
    debugger;
    if( dynamicParam.props.categoryId!=undefined && dynamicParam.props.categoryId!=null && dynamicParam.props.categoryId!="0" ){
      q = query(q, where("categoryId", "==", dynamicParam.props.categoryId ) );
      return [q, await this.getRunTimeCountElementsDB(q)];
    }    
    return [q,undefined];

  }
  

}
