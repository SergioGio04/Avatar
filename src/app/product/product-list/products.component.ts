import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
export class ProductsComponent implements OnInit {

  repoProducts?:Product[];
  dtFormattedTable:any;

  pageSize:number= 5;
  pageIndex:number=0;
  isDataNotReceived:boolean=true;
  idToGetDocumentSnap?:string | undefined;
  isNext?:number | undefined;
  getCountElementsServer?: any;
  sortDirection?:OrderByDirection|undefined="asc";
  columnToSort?:string|undefined;

  
  searchString?:string|undefined="";

  private searchSubject = new Subject<string>();


  constructor(
    private ProductServiceService:ProductServiceService, 
    private router: Router,
  ) {}

  @ViewChild(MatSort) myMatSort:MatSort

  async ngOnInit(): Promise<void> {
    try{
      await this.getMyList();
    }
    catch(error){
      console.error(error);
    }

    this.searchSubject.pipe(
      debounceTime(500)      
    ).subscribe( searchString => {
      debugger;
      this.launchSearch();
    })
    
  }

  async getMyList(){
    this.isDataNotReceived=true;
    //GET LIST
    [this.repoProducts, this.getCountElementsServer]= await this.ProductServiceService.getList(
      this.pageSize, 
      this.idToGetDocumentSnap, 
      this.isNext, 
      this.sortDirection, 
      this.columnToSort, 
      this.searchString
    );
    if(this.repoProducts!=undefined){
      this.isDataNotReceived=false;
    }
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
  }

  //RESET ANIMATION ROW SORT
  resetRowSort(){    
    this.myMatSort.sort({
      id: '',
      start: '', 
      disableClear: true
    });
  }

  //SORT DATA
  sortData(sort: any) {
    if(sort.active!="" ){
      this.pageIndex= 0;
      this.idToGetDocumentSnap= undefined;
      this.isNext= undefined;
      this.searchString= undefined;  
      if(sort.direction!=""){  
        this.sortDirection= sort.direction;     
        this.columnToSort=  sort.active;             
      } 
      else{
        this.sortDirection= undefined;
        this.columnToSort=undefined;        
      }
      this.getMyList();
    }
  }

  //(FORWARD/BACKWARD)ITEMS X PAGE
  async getChangesDetailsPaginator(pageInfo: any){

    if(pageInfo.pageSize != this.pageSize){
      this.pageIndex= 0;
      this.pageSize= pageInfo.pageSize;     
      this.idToGetDocumentSnap= undefined; 
      this.isNext= undefined;      
      this.sortDirection= undefined;  
      this.columnToSort= undefined;   
      this.resetRowSort();
      this.searchString= undefined; 
       
    }
    else{
      let condForward= Number(pageInfo.pageIndex) > Number(pageInfo.previousPageIndex);
      let condBackward= Number(pageInfo.pageIndex) < Number(pageInfo.previousPageIndex);
      //backward
      if(condBackward==true ){
        this.isNext=1;
        this.pageIndex= pageInfo.pageIndex;
        this.idToGetDocumentSnap= this.dtFormattedTable.body[0].id;
      }
      //forward
      if(condForward==true ){
        this.isNext=2;
        this.pageIndex= pageInfo.pageIndex;
        this.idToGetDocumentSnap= this.dtFormattedTable.body[this.pageSize-1].id;
      }
    }
    await this.getMyList();
  }

  //ALL SEARCH's
  async searchChanged(event: Event) {
    //this.searchString = (event.target as HTMLInputElement).value;
    let newSearchValue= (event.target as HTMLInputElement).value;
    this.searchString= newSearchValue;
    this.searchSubject.next( newSearchValue );
  }
  async launchSearch(){
    this.pageIndex=0;
    this.idToGetDocumentSnap= undefined;
    this.isNext= undefined;
    this.sortDirection= undefined;
    this.columnToSort= undefined;
    this.resetRowSort();
    
    await this.getMyList();
  }

  ChangeRoute(id:string|number|undefined){
      if(id!= undefined){
        this.router.navigate(["products", id]);
      }      
  }
  
}
