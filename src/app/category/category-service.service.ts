import { Injectable, Injector } from '@angular/core';
import { Category } from './category';
import { ServiceBase } from '../abstracts/service-base-service';
@Injectable({ providedIn: 'any' })
export class CategoryServiceService extends ServiceBase<Category> {
  constructor(injector: Injector) { 
    super(injector);
  }
  getNameCollection():string {
    return "categories";
  }
  
  getModelInstance(json?:any): Category {
    return new Category(json);
  }
}
