import { Injectable, Injector } from '@angular/core';
import { DocumentData, Query, query, where } from 'firebase/firestore';
import { ServiceBase } from './service-base-service';
import { BridgeCategory } from './bridge-category';
import { BridgeCategoryParams } from './bridge-category-params';

@Injectable({
  providedIn: 'root'
})

export abstract class BridgeCategoryService<T extends BridgeCategory, P extends BridgeCategoryParams > extends ServiceBase<T, P> {

  constructor( injector: Injector) { 
    super(injector);
  }

  override async getAdditionalQuery(q:Query, dynamicParam?: P): Promise<Query>{
  
    if( dynamicParam?.categoryId!= undefined && dynamicParam?.categoryId!= null && dynamicParam?.categoryId!="0" ){
      q = query(q, where("categoryId", "==", dynamicParam?.categoryId ) );
      return q;
    }    
    return q;

  }

}
