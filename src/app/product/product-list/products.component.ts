import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-list',
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
    MatSortModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends ListBaseComponent<Product, ProductServiceService>  {


  constructor(
    injector: Injector,
    private ProductServiceService:ProductServiceService, 
  ) {
    super(injector);
  }

  override getModel(json:any):Product{
    return new Product(json);
  }

  override getService(): ProductServiceService {
    return this.ProductServiceService;
  }

  ChangeRoute(id:string|number|undefined){
    if(id!= undefined){
        this.router.navigate(["products", id]);
      }      
  }

  
}
