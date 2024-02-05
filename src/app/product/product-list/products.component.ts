import {  Component, Inject, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductComponent } from '../product-detail/product.component';
import { Product } from '../product';
import {MatTableModule, MatTableDataSource} from
'@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from
'@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AggregateQuerySnapshot, OrderByDirection, QueryDocumentSnapshot, QuerySnapshot } from
'firebase/firestore';
import { Sort } from '@angular/material/sort';
import { MatSortHeader } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import {MatSortModule} from '@angular/material/sort';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { ListBaseComponent } from '../../abstracts/list-base.component';
import { HtmlGeneratorComponent } from "../../html-generator/html-generator.component";
import { CategoryServiceService } from '../../category/category-service.service';
import { Category } from '../../category/category';
import { MatSelectModule } from '@angular/material/select';
import { GetDynamicParams } from '../../abstracts/get-dynamic-params';
import { ProductParams } from '../product-params';

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
export class ProductsComponent extends ListBaseComponent<Product, ProductServiceService>  {
  
  listCategories:Category[];
  selectedId:string;

  constructor(
    injector: Injector,
    protected productServiceService:ProductServiceService, 
    protected categoryService:CategoryServiceService,
    //protected dynamicParams: GetDynamicParams
  ) {
    super(injector);
    this.dtFormattedTable.displayedColumns= ["id", "title", "brand", "description"];
    this.dtFormattedTable.displayFields= [ 
      {"headerName": "Id",          "namefieldBody": "id"},
      {"headerName": "Title",       "namefieldBody": "title"},
      {"headerName": "Brand",       "namefieldBody": "brand"},
      {"headerName": "Description", "namefieldBody": "description"},
    ];
  }

  getDynamicParams(): GetDynamicParams{
    return new GetDynamicParams(
      { 
        "categoryId": this.selectedId,  
        "productInstance": new Product({brand:"EIIIIII"})
      }
    );
    //return new ProductParams(this.selectedId);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.listCategories= await this.categoryService.getListCategories();
    this.selectedId= this.listCategories[0].id as string;
  }

  selectCategoryChanged( event:any ){
    this.selectedId= event.value;
    //this.productServiceService.categoryId= event.value;

    this.pageIndex= 0;
    this.idToGetDocumentSnap= undefined;
    this.isNext= undefined;

    this.getMyList();
    //this.getMyList([this.selectedId]);
  }

  override getModel(json:any):Product{
    return new Product(json);
  }

  override getService(): ProductServiceService {
    return this.productServiceService;
  }

  ChangeRoute(id:string|number|undefined){
    if(id!= undefined){
        this.router.navigate(["products", id]);
      }      
  }

  

  
}
