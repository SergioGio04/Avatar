import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { HtmlGeneratorComponent } from '../../html-generator/html-generator.component';
import { ProductComponent } from '../../product/product-detail/product.component';
import { BottleService } from '../services/bottle.service';
import { Bottle } from '../models/bottle';
import { BottleParams } from '../models/bottle-params';
import { ListBaseComponent } from '../../abstracts/list-base.component';
import { CategoryServiceService } from '../../category/category-service.service';
import { Category } from '../../category/category';
import { ButtonModule } from 'primeng/button';
import { BridgeCategoryAdditionalColumns } from '../../abstracts/bridge-category-additional-columns';

@Component({
  selector: 'app-bottle-list',
  standalone: true,
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
    ButtonModule
  ],
  templateUrl: './bottle-list.component.html',
  styleUrl: './bottle-list.component.scss'
})
export class BottleListComponent extends BridgeCategoryAdditionalColumns<Bottle, BottleService, BottleParams > {
  
  constructor( 
    injector: Injector,
    protected bottleService: BottleService,
  ){
    super(injector);
    this.dtFormattedTable.displayedColumns= 
    ["id", "brand", "cost", "categoryId", "categoryName"];
    this.dtFormattedTable.displayFields= [ 
      {"headerName": "Id",          "namefieldBody": "id"},
      {"headerName": "Brand",       "namefieldBody": "brand"},
      {"headerName": "Cost",        "namefieldBody": "cost"},
      {"headerName": "Category Id", "namefieldBody": "categoryId"},
      {"headerName": "Category Name", "namefieldBody": "categoryName"},
    ];
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }

  override getModel(json: any): Bottle {
    return new Bottle(json);
  }
  override getDynamicParams(): BottleParams {
    return new BottleParams(this.selectedId);
  }
  override getService(): BottleService {
    return this.bottleService;
  }
 

}
