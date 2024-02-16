import { BridgeCategoryParams } from "../../abstracts/bridge-category-params";

export class ProductParamsModel extends BridgeCategoryParams{

    constructor(categoryId?:string, fromBigQuery?:boolean) {
        super(categoryId, fromBigQuery);
    }
}

