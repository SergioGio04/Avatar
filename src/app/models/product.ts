export class Product{
    id?:number;
    brand?:string;
    title?:string;
    description?:string;
    notFound?: string;
    
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
        else{
            this.notFound= "NOT FOUND";
        }
    }

}