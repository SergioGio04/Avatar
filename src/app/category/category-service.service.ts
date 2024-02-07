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

  //prms, se vuoi il category e cosa vuoi impostare come title
  async getListCategories(defaultSelectConfig?: { [key: string|number]: any }):Promise<Category[]>{
    let [list]= await this.getList();

    if(defaultSelectConfig && defaultSelectConfig["enabled"]==true){
      let categoryNone= new Category();
      categoryNone.id= defaultSelectConfig["value"];
      categoryNone.title= defaultSelectConfig["label"];    
      list.splice(0, 0, categoryNone);
    }
    return list;
  }
  
  getNameCollection():string {
    return "categories";
  }
  getModelInstance(json?:any): Category {
    return new Category(json);
  }


}
