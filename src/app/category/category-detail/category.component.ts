import { Component, Injector } from '@angular/core';
import { Category } from '../category';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../category-service.service';
import { DetailBaseComponent } from '../../abstracts/detail-base.component';
import { CategoryParamsModel } from '../models/category-params-model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent extends DetailBaseComponent<Category, CategoryServiceService, CategoryParamsModel> {

  constructor(
    injector: Injector,
    private categoryServiceService:CategoryServiceService, 
  ) {
    super(injector);
  }
  
  override initializationForm(): void {
    this.form.addControl("brand", new UntypedFormControl(undefined));
    this.form.addControl("title", new UntypedFormControl(undefined));
    this.form.addControl("description", new UntypedFormControl(undefined));
  }
  override getParamsId(): string {
    return "idCategory";
  }
  override getModel(json?: any): Category {
    return new Category(json);
  }
  override getService(): CategoryServiceService {
    return this.categoryServiceService;
  }
  

}

