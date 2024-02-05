import { Injectable, Inject, Injector } from "@angular/core";
import { GetDynamicParams } from "../abstracts/get-dynamic-params";

//@Injectable({ providedIn: 'root' })


export class ProductParams  {
//export class ProductParams extends GetDynamicParams {

    categoryId?:string;
    constructor( obj?:any) {
        //super();
        this.categoryId= obj.value;
        //this[obj.name]<obj.type>= obj.value;
        debugger
    }

}

