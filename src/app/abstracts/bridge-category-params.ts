import { BaseParameters } from "./base-parameters";

export class BridgeCategoryParams extends BaseParameters{
    categoryId?:string;
    constructor(categoryId?:string, fromBigQuery?:boolean) {
        super(fromBigQuery);
        this.categoryId= categoryId;
    }
}