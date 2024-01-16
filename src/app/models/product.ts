export class Product{
    id?:number;
    brand?:string;
    title?:string;
    description?:string;
    
    constructor(json?:any) { 
        this.setData(json);
    }

    private setData(json:any){
        this.id=json.id;
        this.brand=json.brand;
        this.title=json.title;
        this.description=json.description;
    }

}