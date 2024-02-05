import { Component, Injector } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ProductServiceService } from '../product-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { DetailBaseComponent } from '../../abstracts/detail-base.component';
import { HtmlGeneratorComponent } from "../../html-generator/html-generator.component";
import { CategoryServiceService } from '../../category/category-service.service';
import { Category } from '../../category/category';
import {MatSelectModule} from '@angular/material/select';
import { GetDynamicParams } from '../../abstracts/get-dynamic-params';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule, HtmlGeneratorComponent, MatSelectModule]
})
export class ProductComponent extends DetailBaseComponent<Product, ProductServiceService> {
  
  listCategories:Category[];
  
  constructor(
    injector: Injector, 
    protected productService: ProductServiceService,
    protected categoryService: CategoryServiceService  
  ) {    
    super(injector);   
  }
  
  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.listCategories= await this.categoryService.getListCategories();
  }
  override initializationForm(): void {
   this.form.addControl("brand", new UntypedFormControl(undefined));
   this.form.addControl("title", new UntypedFormControl(undefined));
   this.form.addControl("description", new UntypedFormControl(undefined));
   this.form.addControl("categoryId",  new UntypedFormControl(undefined));
  }
  override getParamsId(): string {
    return "idProduct";
  }
  override getModel(json?: any): Product {
    return new Product(json);
  }
  override getService(): ProductServiceService {
    return this.productService;
  }


}

