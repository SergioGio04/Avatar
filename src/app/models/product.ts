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
            this.id=json.id;
            this.brand=json.brand;
            this.title=json.title;
            this.description=json.description;
        }
    }
    public getData(){
        var obj:any={};

        //obj["id"]= this.id;
        obj["brand"]= this.brand;
        obj["title"]= this.title;
        obj["description"]= this.description;

        return obj;
    }

}