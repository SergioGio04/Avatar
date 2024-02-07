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
export class BottleListComponent extends ListBaseComponent<Bottle, BottleService, BottleParams > {
  
  listCategories: Category[];
  selectedId: string|undefined;

  constructor( 
    injector: Injector,
    protected bottleService: BottleService,
    protected categoryService:CategoryServiceService
  ){
    super(injector);
    this.dtFormattedTable.displayedColumns= ["id", "brand", "cost"];
    this.dtFormattedTable.displayFields= [ 
      {"headerName": "Id",          "namefieldBody": "id"},
      {"headerName": "Brand",       "namefieldBody": "brand"},
      {"headerName": "Cost", "namefieldBody": "cost"},
    ];
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    let defaultSelectConfig= { enabled: true, value:"0", label:"niente" };
    this.listCategories= await this.categoryService.getListCategories( defaultSelectConfig );
    this.selectedId= this.listCategories[0].id;
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

  selectCategoryChanged( event:any ){
    this.selectedId= event.value;
    this.pageIndex= 0;
    this.idToGetDocumentSnap= undefined;
    this.isNext= undefined;
    this.getMyList();
  }


  

}
