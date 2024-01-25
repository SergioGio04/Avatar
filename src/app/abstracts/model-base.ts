
export abstract class ModelBase {
    id?:string;
    constructor(json?:any){
        this.setData(json);
    }
    protected setData(json?:any){
        if(json){
            this.id= json.id;
        }
    }
    
    public getData():any {
        var obj:any={};
        if(this.id != undefined){
            obj["id"]= this.id
        }    
        return obj;
    }

}