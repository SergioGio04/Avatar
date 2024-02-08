import { Injector } from "@angular/core";
import { Category } from "../category/category";
import { CategoryServiceService } from "../category/category-service.service";
import { ModelBase } from "./model-base";
import { FillerModel } from "./filler-model";

export class BridgeCategoryParams{
    constructor(){}
}

export abstract class BridgeCategory extends FillerModel<Category, BridgeCategoryParams, CategoryServiceService>{
    categoryId?:string;
    categoryName?: string;

    constructor( injector:Injector, json?:any, ) { 
        super(injector, json);
    }

    override getService(): CategoryServiceService{
        return this.injector.get(CategoryServiceService);
    }
    override getId():string{
        return this.categoryId?? "";
    }

    /*
    public async fillCategory(injector: Injector){
        if(this.categoryId){
            let categoryService= injector.get(CategoryServiceService);
            this.category= await categoryService.getDetail(this.categoryId!);
        }
    }
    */

    public override setData(json?:any){
        super.setData(json);
        if(json){
            this.categoryId= json.categoryId;
            this.categoryName= json.categoryName;
            
        }
    }

    public override getData(){
        var obj= super.getData();
        obj["categoryId"]= this.categoryId!=null && this.categoryId!=undefined ? this.categoryId : null;
        obj["categoryName"]= this.categoryName!=null && this.categoryName!=undefined ? this.categoryName : null;
        return obj;
    }

}