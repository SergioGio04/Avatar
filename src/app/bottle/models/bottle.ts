import { BridgeCategory } from "../../abstracts/bridge-category";
import { ModelBase } from "../../abstracts/model-base";


export class Bottle extends BridgeCategory{
    brand?:string;
    cost?:number;
    
    constructor(json?:any) { 
        super(json);
    }

    public override setData(json?:any){
        super.setData(json);
        if(json){
            this.brand=json.brand;
            this.cost= json.cost;
        }
    }
    public override getData(){
        var obj= super.getData();
        obj["brand"]= this.brand? this.brand : null;
        obj["cost"]= this.cost? this.cost : null;
        
        this.setLowercaseSearch(obj, [{val: obj.brand}] );
        return obj;
    }

    

}