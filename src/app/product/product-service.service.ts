import { ImportProvidersSource, Injectable, Injector } from '@angular/core';
import { Product } from './product';
import { ServiceBase } from '../abstracts/service-base-service';
import { Category } from '../category/category';
import { Query, getCountFromServer, query, where } from 'firebase/firestore';
import { ProductParamsModel } from './models/product-params-model';
import { BridgeCategoryService } from '../abstracts/bridge-category.service';
import { BaseParameters } from '../abstracts/base-parameters';

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

  override additionalSelectQueryBigQuery(){
    let q='\
      JSON_EXTRACT_SCALAR(data, "$.brand") AS brand,\
      JSON_EXTRACT_SCALAR(data, "$.title") AS title,\
      JSON_EXTRACT_SCALAR(data, "$.categoryId") AS categoryId,\
      JSON_EXTRACT_SCALAR(data, "$.description") AS description,\
    ';
    return q; 
  }

  override additionalWhereBigQuery(isWhereUsed:boolean, dynamicParam:ProductParamsModel){
    let query= "";
    if( dynamicParam?.categoryId!= undefined && dynamicParam?.categoryId!= null && dynamicParam?.categoryId!="0" ){
      query+= isWhereUsed? " AND ": " WHERE ";
      query+= ' categoryId = "'+dynamicParam?.categoryId+'"';
    }    
    return query;
  }
  

}
