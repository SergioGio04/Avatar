import { Injectable, Injector } from '@angular/core';
import { Category } from './category';
import { ServiceBase } from '../abstracts/service-base-service';
@Injectable({ providedIn: 'root' })

export class CategoryServiceService extends ServiceBase<Category> {
//export class CategoryServiceService  {
  

  constructor(injector: Injector) { 
    super(injector);
  }

  async getListCategories():Promise<Category[]>{
    let list= await this.getList().then(data => data[0]);
    let categoryNone= new Category({"id": 0, "title": "niente"}).getData();
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
