import { ModelBase } from "../abstracts/model-base";

export abstract class ModelloSearch extends ModelBase {
    search?:string
    constructor( json?:any ){
        super(json);
        if(json){
            this.search= json.search;
        }        
    }

}
