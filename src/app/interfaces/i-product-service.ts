import { Injectable, forwardRef } from "@angular/core";
import { Product } from "../models/product";
import { CustomProductServiceService } from "../services/custom-product-service.service";
import { ProductServiceService } from "../services/product-service.service";

@Injectable({ providedIn: 'root', 
    useClass: forwardRef(()=>ProductServiceService)
})

export abstract class IProductService{
    
    abstract getProducts(): Promise<Product[]>;
    abstract getProduct(id: string): Promise<Product>;
    abstract AddProduct(product: Product): Promise<Product>;
    abstract UpdateProduct(product: Product): Promise<any>;
    abstract DeleteProduct(product: Product): Promise<any>;

    

}

