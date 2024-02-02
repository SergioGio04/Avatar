import { Component, Inject, Injector, OnInit } from '@angular/core';
import { CategoryServiceService } from '../category-service.service';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryComponent } from '../category-detail/category.component';
import { Category } from '../category';
import { ListBaseComponent } from '../../abstracts/list-base.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterOutlet, 
    CategoryComponent,
    MatTable,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})

//export class CategoryListComponent implements OnInit {
export class CategoryListComponent extends ListBaseComponent<Category, CategoryServiceService>  {

  constructor(
    injector: Injector,
    private CategoryServiceService:CategoryServiceService, 
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

  override getModel(json: any): Category {
    return new Category(json);
  }
  override getService(): CategoryServiceService {
    return this.CategoryServiceService;
  }

  ChangeRoute(id:string|number|undefined){
    if(id!= undefined){
      this.router.navigate(["categories", id]);
  }
        
}

}
