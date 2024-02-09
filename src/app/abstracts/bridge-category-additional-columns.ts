import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { CategoryServiceService } from '../category/category-service.service';
import { ListBaseComponent } from './list-base.component';
import { ModelBase } from './model-base';
import { BridgeCategoryService } from './bridge-category.service';
import { BridgeCategoryParams } from './bridge-category-params';
import { Category } from '../category/category';
import { ProductParamsModel } from '../product/models/product-params-model';
import { BridgeCategory } from './bridge-category';

@Component({
    selector: 'app-list',
    standalone: true,
    template: '',
    imports: [
        CommonModule,
        RouterOutlet,
        MatTableModule,
        MatPaginator,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatSelectModule,
        
    ],
})
export abstract class BridgeCategoryAdditionalColumns
  <M extends BridgeCategory, S extends BridgeCategoryService<M, P & BridgeCategoryParams>, P> 
  extends ListBaseComponent<M, S, P >  {
  
  listCategories: Category[];
  selectedId: string|undefined;

  abstract override getModel(json:any):M;
  abstract override getService(): S;
  abstract override getDynamicParams(): P;
  private categoryService:CategoryServiceService;

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.categoryService= injector.get(CategoryServiceService);
  }

  selectCategoryChanged( event:any ){
    this.selectedId= event.value;
    this.pageIndex= 0;
    this.idToGetDocumentSnap= undefined;
    this.isNext= undefined;
    this.getMyList();
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    let defaultSelectConfig= { enabled: true, value:"0", label:"niente" };
    this.listCategories= await this.categoryService.getListCollection( defaultSelectConfig );
    this.selectedId= this.listCategories[0].id;

  }

  
  
}
