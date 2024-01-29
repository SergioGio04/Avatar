import { ModelBase } from "../abstracts/model-base";

export class Product extends ModelBase{
    brand?:string;
    title?:string;
    description?:string;
    
    constructor(json?:any) { 
        super(json);
    }

    protected override setData(json?:any){
        super.setData(json);
        if(json){
            this.brand=json.brand;
            this.title=json.title;
            this.description=json.description;
        }
    }
    public override getData(){
        var obj= super.getData();
        obj["brand"]= this.brand? this.brand : null;
        obj["title"]= this.title? this.title : null;
        obj["description"]= this.description? this.description : null;

        let stringToGetAllCombinations= "";
        if(obj.brand != null)stringToGetAllCombinations+=obj.brand.toLocaleLowerCase()+" ";
        if(obj.title != null)stringToGetAllCombinations+=obj.title.toLocaleLowerCase();
        obj["lowercaseSearch"]= this.SetArrayOfAllCombinations(stringToGetAllCombinations);

        return obj;
    }

    public SetArrayOfAllCombinations(s: string): string[]{
        let list_of_strings = new Array();
        for(let i=0;i<s.length;i++) {
            for(let j=i+1;j<s.length+1;j++) {
                list_of_strings.push(s.slice(i, j));
            }
        }
        return list_of_strings;
    }

}