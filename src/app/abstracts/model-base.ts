import { Injector } from "@angular/core";

export abstract class ModelBase {
    id?:string;
    fromBigQuery?:boolean=false;

    constructor(json?:any){
        this.setData(json);
    }
    
    public setData(json?:any){
        if(json){
            this.id= json.id;
        }
    }

    public getName(){
        return "-"
    }
    
    public getData():any {
        var obj:any={};
        if(this.id != undefined){
            obj["id"]= this.id
        }    
        return obj; 
    }

    public async fillModels(injector: Injector){}

    setLowercaseSearch(obj?:any, elemToCombine?: any[]){
        if(obj!=undefined && elemToCombine!=undefined){
            obj["lowercaseSearch"]= this.SetArrayOfAllCombinations(
                this.generateStringForCombinations(elemToCombine)
            );
        }        
        return obj;
    }

    public SetArrayOfAllCombinations(s: string): string[]{
        debugger;
        let list_of_strings = new Array();
        for(let iStart=0; iStart<s.length;iStart++) {
            for(let iEnd=iStart+1;iEnd<s.length+1;iEnd++) {
                let stringToAdd= s.slice(iStart, iEnd);
                if(list_of_strings.includes(stringToAdd) == false){
                    list_of_strings.push(stringToAdd);
                }
            }
        }
        return list_of_strings;
    }

    public generateStringForCombinations(arrayStrings: any[] ){
        let finalString= "";
        for(let obj of arrayStrings){
            if(obj.val!= undefined && obj.val!= null){
                finalString+=obj.val + (obj.isSpaceAfter==true? " " : "") ;
            }
        }
        return finalString.toLocaleLowerCase();
    }

}