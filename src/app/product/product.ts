import { Injector } from "@angular/core";
import { BridgeCategory } from "../abstracts/bridge-category";
import { ModelBase } from "../abstracts/model-base";
import { Category } from "../category/category";
import { CategoryServiceService } from "../category/category-service.service";


export class Product extends BridgeCategory{
    brand?:string;
    title?:string;
    description?:string;
    
    constructor(injector:Injector, json?:any) { 
        super(injector, json);
    }

    public override setData(json?:any){
        super.setData(json);
        if(json){
            this.brand=json.brand;
            this.title=json.title;
            this.description=json.description;
        }
    }
    public override getData(){
        var obj= super.getData();
        obj["brand"]= this.brand? this.brand : null;
        obj["title"]= this.title? this.title : null;
        obj["description"]= this.description? this.description : null;
       
        debugger;
        obj["lowercaseSearch"]= this.SetArrayOfAllCombinations(
            this.generateStringForCombinations( [{val: obj.brand, isSpaceAfter:true}, {val: obj.title} ] )
        );
        return obj;
    }

    

}