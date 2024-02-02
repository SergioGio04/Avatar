import { ModelBase } from "../abstracts/model-base";

export class Category extends ModelBase{
    brand?:string;
    title?:string;
    description?:string;
    
    constructor(json?:any) { 
        //chiama il costruttore di chi estendi
        super(json)
    }

    protected override setData(json?:any){
        super.setData(json);
        if(json){
            this.brand=json.brand;
            this.title=json.title;
            this.description=json.description;
        }
    }
    public override getData(){        
        var obj=super.getData();
 
        obj["brand"]= this.brand? this.brand : null;
        obj["title"]= this.title? this.title : null;
        obj["description"]= this.description? this.description : null;

        obj["lowercaseSearch"]= this.SetArrayOfAllCombinations(
            this.generateStringForCombinations( [
                {val: obj.brand, isSpaceAfter:true}, 
                {val: obj.title} ] 
            )
        );
        return obj;
    }

}