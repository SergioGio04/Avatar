import { Injectable, Injector } from '@angular/core';
import { Category } from './category';
import { ServiceBase } from '../abstracts/service-base-service';
import { Query, query, where } from 'firebase/firestore';
import { GetDynamicParams } from '../abstracts/get-dynamic-params';
@Injectable({ providedIn: 'root' })

export class CategoryServiceService extends ServiceBase<Category> {
//export class CategoryServiceService  {


  constructor(injector: Injector) { 
    super(injector);
  }

  //prms, se vuoi il category e cosa vuoi impostare come title
  async getListCategories():Promise<Category[]>{
    let [list]= await this.getList();
    let categoryNone= new Category();
    categoryNone.id="0";
    categoryNone.title="niente";
    
    list.splice(0, 0, categoryNone);
    return list;
  }
  
  getNameCollection():string {
    return "categories";
  }
  getModelInstance(json?:any): Category {
    return new Category(json);
  }

}
