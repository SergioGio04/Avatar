import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductComponent } from '../product-detail/product.component';
import { Product } from '../product';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

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
    MatInputModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  repoProducts?:Product[];
  dtFormattedTable:any;

  constructor(
    private ProductServiceService:ProductServiceService, 
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit(): Promise<void> {
    try{
      this.repoProducts= await this.ProductServiceService.getList();
      this.dtFormattedTable= {
        displayedColumns: ["id", "title", "brand", "description"],        
        displayFields: [ 
          {"headerName": "Id",          "namefieldBody": "id"},
          {"headerName": "Title",       "namefieldBody": "title"},
          {"headerName": "Brand",       "namefieldBody": "brand"},
          {"headerName": "Description", "namefieldBody": "description"},
        ],
        body: new MatTableDataSource(this.repoProducts),
      }
      this.dtFormattedTable.body.paginator = this.paginator
    }
    catch(error){
      console.error(error);
    }
  }
  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dtFormattedTable.body.filter = filterValue.trim().toLowerCase();

  }
  ChangeRoute(id:string|number|undefined){
      if(id!= undefined){
        this.router.navigate(["products", id]);
      }      
  }
}
