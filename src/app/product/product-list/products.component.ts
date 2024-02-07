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
export class ProductsComponent extends ListBaseComponent<Product, ProductServiceService, ProductParamsModel >  {
  
  listCategories: Category[];
  selectedId: string|undefined;

  constructor(
    injector: Injector,
    protected productServiceService:ProductServiceService, 
    protected categoryService:CategoryServiceService
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

  getDynamicParams(): ProductParamsModel{
    return new ProductParamsModel(this.selectedId);
    //return new GetDynamicParams(baseParams, { "pippo": "pluto" });
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    let defaultSelectConfig= { enabled: true, value:"0", label:"niente" };
    this.listCategories= await this.categoryService.getListCategories( defaultSelectConfig );
    this.selectedId= this.listCategories[0].id;
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
