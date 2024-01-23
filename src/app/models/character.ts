
export class Character{
    id?:number;
    name?:string;
    power?:string;
    strength?:number;

    constructor( private json?:any ){
        if(json){
            this.id= json.id;
            this.name= json.name;
            this.power= json.power;
            this.strength= json.strength;
        }        
    }


} 