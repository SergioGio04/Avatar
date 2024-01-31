import { Component, Injector } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ProductServiceService } from '../product-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { DetailBaseComponent } from '../../abstracts/detail-base.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
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

