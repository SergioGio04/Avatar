export class Product{
    id?:string;
    brand?:string;
    title?:string;
    description?:string;
    
    constructor(json?:any) { 
        this.setData(json);
    }

    private setData(json?:any){
        if(json){
            this.id= json.id;
            this.brand=json.brand;
            this.title=json.title;
            this.description=json.description;
        }
    }
    public getData(){
        var obj:any={};

        if(this.id != undefined){
            obj["id"]= this.id
        }    
        obj["brand"]= this.brand? this.brand : null;
        obj["title"]= this.title? this.title : null;
        obj["description"]= this.description? this.description : null;

        return obj;
    }

}