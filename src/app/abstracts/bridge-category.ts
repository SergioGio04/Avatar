import { ModelBase } from "./model-base";
export abstract class BridgeCategory extends ModelBase{
    categoryId?:string;    
    constructor(json?:any) { 
        super(json);
    }
    protected override setData(json?:any){
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