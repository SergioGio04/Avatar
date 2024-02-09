import { Injector } from "@angular/core";
import { Category } from "../category/category";
import { CategoryServiceService } from "../category/category-service.service";
import { ModelBase } from "./model-base";
import { FillerModel } from "./filler-model";

export class BridgeCategoryParams{
    constructor(){}
}
export abstract class BridgeCategory extends ModelBase {
    categoryId?:string;
    category?:Category;

    constructor( json?:any, ) { 
        super(json);
    }
    
    public override async fillModels(injector: Injector){
        await super.fillModels(injector);
        if(this.categoryId){
            let categoryService= injector.get(CategoryServiceService);
            this.category= await categoryService.getDetail(this.categoryId!);
        }
    }

    public override setData(json?:any){
        super.setData(json);
        if(json){
            this.categoryId= json.categoryId;
            
        }
    }

    public override getData(){
        var obj= super.getData();
        obj["categoryId"]= this.categoryId!=null && this.categoryId!=undefined ? this.categoryId : null;
        return obj;
    }

}