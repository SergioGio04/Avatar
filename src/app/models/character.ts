import { ModelloSearch } from "./modello-search.model";

export class Character extends ModelloSearch{
    name?:string;
    power?:string;

    constructor( json?:any ){
        super(json);
        if(json){
            this.name= json.name;
            this.power= json.power;
        }        
    }


} 