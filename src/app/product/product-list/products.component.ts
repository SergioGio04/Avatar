import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductComponent } from '../product-detail/product.component';
import { Product } from '../product';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

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

  pageSize:number= 3;
  pageIndex:number=0;
  //docSnap: QueryDocumentSnapshot | undefined;
  idToGetDocumentSnap?:string | undefined;
  isNext?:number | undefined;
  getCountElementsServer?: any;

  constructor(
    private ProductServiceService:ProductServiceService, 
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit(): Promise<void> {
    try{
      this.getCountElementsServer= await this.ProductServiceService.getCountDocumentsCollection();
      await this.getMyList();
    }
    catch(error){
      console.error(error);
    }
  }

  async getMyList(){
    this.repoProducts= await this.ProductServiceService.getList(this.pageSize, this.idToGetDocumentSnap, this.isNext );
    //[this.repoProducts, this.docSnap]= await this.ProductServiceService.getList(this.pageSize, this.docSnap, this.isNext);
    this.dtFormattedTable= {
        displayedColumns: ["id", "title", "brand", "description"],        
        displayFields: [ 
          {"headerName": "Id",          "namefieldBody": "id"},
          {"headerName": "Title",       "namefieldBody": "title"},
          {"headerName": "Brand",       "namefieldBody": "brand"},
          {"headerName": "Description", "namefieldBody": "description"},
        ],
        body: this.repoProducts,
      }
      //this.dtFormattedTable.body.paginator = this.paginator
  }

  async getPageDetails(pageInfo: any){
    
    let condForward= Number(pageInfo.pageIndex) > Number(pageInfo.previousPageIndex);
    let condBackward= Number(pageInfo.pageIndex) < Number(pageInfo.previousPageIndex);

    //backward
    if(condBackward==true && this.pageIndex!= (pageInfo.pageIndex+1) ){
      this.isNext=1;
      //let geIndexDocument= ((pageInfo.pageIndex+1)*pageInfo.pageSize);
      this.pageIndex= pageInfo.pageIndex;
      this.idToGetDocumentSnap= this.dtFormattedTable.body[0].id;
    }
    //forward
    if(condForward==true && this.pageIndex!= (pageInfo.pageIndex+1)){
      this.isNext=2;
      //let geIndexDocument= ((pageInfo.previousPageIndex+1)*pageInfo.pageSize)-1;
      this.pageIndex= pageInfo.pageIndex;
      this.idToGetDocumentSnap= this.dtFormattedTable.body[this.pageSize-1].id;
    }
    
    if(pageInfo.pageSize != this.pageSize){
      let newPageSize= pageInfo.pageSize

      
      this.isNext=3;
      this.idToGetDocumentSnap=this.dtFormattedTable.body[0].id;
      this.pageIndex= pageInfo.pageIndex!= 0 ? Math.floor( ((pageInfo.pageIndex+1)*this.pageSize)/newPageSize) : pageInfo.pageIndex;
      this.pageSize= newPageSize;
      
      
    }

    await this.getMyList();
    
    //this.pageIndex= Math.floor( ((pageInfo.pageIndex+1)*this.pageSize)/newPageSize);
    //this.pageSize= newPageSize;

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
