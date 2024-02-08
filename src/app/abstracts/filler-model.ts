import { Injector } from "@angular/core";
import { ModelBase } from "./model-base";
import { ServiceBase } from "./service-base-service";

export abstract class FillerModel<M extends ModelBase, P, S extends ServiceBase<M,P> > extends ModelBase{    
    //virtual
    model?:M;
    constructor( public injector:Injector, json?:any) { 
        super(json);
    }
    abstract getService(): S;
    abstract getId():string;
    public async fillModel(){
        this.model= await this.getService().getDetail(this.getId());
    }

}