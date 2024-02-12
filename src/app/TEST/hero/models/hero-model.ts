import { BaseModel } from "../../abstracts/base-model";

export class hero extends BaseModel{
    name?:string;
    side?:string;
    power?:string;
    strength?:number;
    description?:string;
    lowercaseSearch?: string[];

    idGadget?:string;
    idExtraPower?:string;

    constructor(json?:any){
        super(json);
    }
    
    public override setData(json?:any) {
        super.setData(json);
        if(json){
            this.name= json.name;
            this.side= json.side;
            this.power= json.power;
            this.strength= json.strength;
            this.description= json.description;
            this.idGadget= json.idGadget;
            this.idExtraPower= json.idExtraPower;
        }
    }

    public override getData() {
        super.getData();
        let obj:any={};
        obj["id"]= this.id? this.id:null;
        obj["name"]= this.name? this.name:null;
        obj["side"]= this.side? this.side:null;
        obj["power"]= this.power? this.power:null;
        obj["strength"]= this.strength? this.strength:null;
        obj["description"]= this.description? this.description:null;
        obj["idGadget"]= this.idGadget? this.idGadget:null;
        obj["idExtraPower"]= this.idExtraPower? this.idExtraPower:null;

        this.setLowercaseSearch( obj, [{ val: obj.name }] );
        return obj;
    }

}