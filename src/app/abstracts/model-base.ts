
export abstract class ModelBase {
    id?:string;
    constructor(json?:any){
        this.setData(json);
    }
    
    protected setData(json?:any){
        if(json){
            this.id= json.id;
        }
    }
    
    public getData():any {
        var obj:any={};
        if(this.id != undefined){
            obj["id"]= this.id
        }    
        return obj;
    }

    public SetArrayOfAllCombinations(s: string): string[]{
        debugger;
        let list_of_strings = new Array();
        for(let i=0;i<s.length;i++) {
            for(let j=i+1;j<s.length+1;j++) {
                if(list_of_strings.includes(s[j]) == false){
                    list_of_strings.push(s.slice(i, j));
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
        return finalString;
    }

}