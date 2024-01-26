import { Injectable, Injector } from '@angular/core';
import { Category } from './category';
import { ServiceBase } from '../abstracts/service-base-service';
@Injectable({ providedIn: 'root' })

//export class CategoryServiceService extends ServiceBase<Category> {
export class CategoryServiceService  {
  
  constructor(injector: Injector) { 
    //super(injector);
  }
  
  getNameCollection():string {
    return "categories";
  }

  getModelInstance(json?:any): Category {
    return new Category(json);
  }

}
