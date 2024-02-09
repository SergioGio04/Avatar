import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { BaseParams } from '../../abstracts/base-params';
import { ListBaseComponent } from '../../abstracts/list-base.component';
import { Category } from '../../category/category';
import { CategoryServiceService } from '../../category/category-service.service';
import { HtmlGeneratorComponent } from "../../html-generator/html-generator.component";
import { Product } from '../product';
import { ProductComponent } from '../product-detail/product.component';
import { ProductServiceService } from '../product-service.service';
import { ProductParamsModel } from '../models/product-params-model';
import { BridgeCategoryAdditionalColumns } from '../../abstracts/bridge-category-additional-columns';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        ProductComponent,
        MatTableModule,
        MatPaginator,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        HtmlGeneratorComponent,
        MatSelectModule,
        
    ],
})
//export class ProductsComponent extends ListBaseComponent<Product, ProductServiceService, ProductParamsModel >  {
  export class ProductsComponent extends BridgeCategoryAdditionalColumns<Product, ProductServiceService, ProductParamsModel >  {
  

  constructor(
    injector: Injector,
    protected productServiceService:ProductServiceService, 
  ) {
    super(injector);
    this.dtFormattedTable.displayedColumns= ["id", "title", "brand", "description", "categoryId", "categoryName"];
    this.dtFormattedTable.displayFields= [ 
      {"headerName": "Id",          "namefieldBody": "id"},
      {"headerName": "Title",       "namefieldBody": "title"},
      {"headerName": "Brand",       "namefieldBody": "brand"},
      {"headerName": "Description", "namefieldBody": "description"},
      {"headerName": "Category Id", "namefieldBody": "categoryId"},
      {"headerName": "Category Name", "namefieldBody": "categoryName"},
    ];
  }
  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }
  override getModel(json:any):Product{
    return new Product( json);
  }
  override getService(): ProductServiceService {
    return this.productServiceService;
  }
  override getDynamicParams(): ProductParamsModel{
    return new ProductParamsModel(this.selectedId);
  }
  
}
