import { Injectable, Inject, Injector } from "@angular/core";

//@Injectable({ providedIn: 'root' })

export class GetDynamicParams {

    props?:any;
    constructor( prm?:any) {
        this.setData(prm);
    }
    setData(prm?:any){
        if(prm!=undefined){
            this.props= prm;
            console.log(prm);
        }
    }
}

