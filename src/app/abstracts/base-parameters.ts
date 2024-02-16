
export class BaseParameters{
    
    fromBigQuery?:boolean;
    constructor(fromBigquery?:boolean) {
        this.fromBigQuery= fromBigquery;
    }
}