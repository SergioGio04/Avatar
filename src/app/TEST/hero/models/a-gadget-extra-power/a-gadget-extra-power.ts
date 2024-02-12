import { BaseModel } from "../../../abstracts/base-model";

export class AGadgetExtraPower extends BaseModel{
    name?:string;
    strength?:number;

    constructor(json?:any){
        super(json);
    }
    
    public override setData(json?:any) {
        super.setData(json);
        if(json){
            this.name= json.name;
            this.strength= json.strength;
        }
    }

    public override getData() {
        super.getData();
        let obj:any={};
        obj["id"]= this.id? this.id:null;
        obj["name"]= this.name? this.name:null;
        obj["strength"]= this.strength? this.strength:null;
        return obj;
    }


}