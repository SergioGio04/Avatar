import { Component, Injector } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ProductServiceService } from '../product-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { DetailBaseComponent } from '../../abstracts/detail-base.component';
import { HtmlGeneratorComponent } from "../../html-generator/html-generator.component";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule, HtmlGeneratorComponent]
})
export class ProductComponent extends DetailBaseComponent<Product, ProductServiceService> {

  constructor(injector: Injector, protected manager: ProductServiceService) {
    super(injector);
  }  

  override initializationForm(): void {
   this.form.addControl("brand", new UntypedFormControl(undefined));
   this.form.addControl("title", new UntypedFormControl(undefined));
   this.form.addControl("description", new UntypedFormControl(undefined));
  }
  
  override getParamsId(): string {
    return "idProduct";
  }
  override getModel(json?: any): Product {
    return new Product(json);
  }
  override getService(): ProductServiceService {
    return this.manager;
  }


}

