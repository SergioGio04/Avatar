import { Injectable, Injector } from '@angular/core';
import { BottleParams } from '../models/bottle-params';
import { Bottle } from '../models/bottle';
import { ServiceBase } from '../../abstracts/service-base-service';
import { DocumentData, Query, query, where } from 'firebase/firestore';
import { ProductParamsModel } from '../../product/models/product-params-model';
import { BridgeCategoryService } from '../../abstracts/bridge-category.service';

@Injectable({
  providedIn: 'root'
})

export class BottleService extends BridgeCategoryService<Bottle, BottleParams> {

  constructor( injector: Injector) { 
    super(injector);
  }

  getNameCollection(): string {
    return "bottles";
  }
  getModelInstance(json?: any): Bottle {
    return new Bottle(json);
  }
  
  override async getAdditionalQuery(q:Query, dynamicParam?: BottleParams): Promise<Query>{
    q= await super.getAdditionalQuery(q, dynamicParam);
    return q;

  }


}
