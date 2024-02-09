import { Injector } from "@angular/core";
import { ModelBase } from "./model-base";
import { ServiceBase } from "./service-base-service";

export abstract class FillerModel<M extends ModelBase, P, S extends ServiceBase<M,P> > extends ModelBase{    
    
    //virtual
    model?:M;
    constructor(  json?:any) { 
        super(json);
    }

    abstract getService(injector: Injector): S;
    abstract getId():string;
    public async fillModel(injector: Injector){
        if(this.getId()){
            this.model= await this.getService(injector).getDetail(this.getId());
        }
        
    }

}