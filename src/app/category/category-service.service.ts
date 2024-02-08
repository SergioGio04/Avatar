import { Injectable, Injector } from '@angular/core';
import { Category } from './category';
import { ServiceBase } from '../abstracts/service-base-service';
import { Query, query, where } from 'firebase/firestore';
import { CategoryParamsModel } from './models/category-params-model';


@Injectable({ providedIn: 'root' })

export class CategoryServiceService extends ServiceBase<Category, CategoryParamsModel> {
//export class CategoryServiceService  {

  constructor(injector: Injector) { 
    super(injector);
  }
  
  getNameCollection():string {
    return "categories";
  }
  getModelInstance(json?:any): Category {
    let model= new Category(json);
    return model;
  }


}
