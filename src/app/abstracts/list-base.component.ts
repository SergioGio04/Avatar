import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
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
import { ModelBase } from './model-base';
import { ServiceBase } from './service-base-service';
import { BaseParams } from './base-params';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  template: ''
})
export abstract class ListBaseComponent<T extends ModelBase, M extends ServiceBase<T, P>, P > {

  repoProducts?:T[];
  dtFormattedTable:any={};

  pageSize:number= 5;
  pageIndex:number=0;
  isDataNotReceived:boolean=true;
  idToGetDocumentSnap?:string | undefined;
  isNext?:boolean | undefined;
  triggerCount?:boolean=false;
  getCountElementsServer?: number | boolean;
  sortDirection?:OrderByDirection|undefined="asc";
  columnToSort?:string|undefined;

  searchString?:string|undefined="";
  private searchSubject = new Subject<string>();


  router:Router;
  constructor(injector: Injector) {
    this.router= injector.get(Router);
    this.dtFormattedTable= {
      body: []
    }
  }

  @ViewChild(MatSort) myMatSort:MatSort

  abstract getModel(json:any):T;
  abstract getDynamicParams():P;
  abstract getService():M;

  async ngOnInit(): Promise<void> {
    try{
      this.triggerCount=true;
      await this.getMyList();
      this.triggerCount=false;
    }
    catch(error){
      console.error(error);
    }

    this.searchSubject.pipe(
      debounceTime(500)      
    ).subscribe( async(searchString) => {
      await this.launchSearch();
    })

  }


  //async getMyList(prms?:P){
  async getMyList(){
    this.isDataNotReceived=true;
    //GET LIST
    var baseParams= new BaseParams(
      this.pageSize, 
      this.idToGetDocumentSnap, 
      this.isNext, 
      this.sortDirection, 
      this.columnToSort, 
      this.searchString
    );
    let resGetList= await this.getService().getList( 
      baseParams,
      this.getDynamicParams()
    );

    this.repoProducts= resGetList[0];  
    this.getCountElementsServer= resGetList[1] == false ? this.getCountElementsServer : resGetList[1];
    
    if(this.repoProducts!=undefined){
      this.isDataNotReceived=false;
    }
    this.dtFormattedTable.body= this.repoProducts;
  }

  //RESET ANIMATION ROW SORT
  /*
  resetRowSort(){    
    this.myMatSort.sort({
      id: '',
      start: '', 
      disableClear: true
    });
  }
  */

  //SORT DATA
  sortData(sort: any) {
    if(sort.active!="" ){
      this.pageIndex= 0;
      this.idToGetDocumentSnap= undefined;
      this.isNext= undefined;
      //this.searchString= undefined;  
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
      //this.sortDirection= undefined;  
      //this.columnToSort= undefined;   
      //this.resetRowSort();
      
      //this.searchString= undefined; 

      await this.getMyList();
    }
    else{
      let condForward= Number(pageInfo.pageIndex) > Number(pageInfo.previousPageIndex);
      let condBackward= Number(pageInfo.pageIndex) < Number(pageInfo.previousPageIndex);
      //backward
      if(condBackward==true ){
        this.isNext=false;
        this.pageIndex= pageInfo.pageIndex;
        this.idToGetDocumentSnap= this.dtFormattedTable.body[0].id;
      }
      //forward
      if(condForward==true ){
        this.isNext=true;
        this.pageIndex= pageInfo.pageIndex;
        this.idToGetDocumentSnap= this.dtFormattedTable.body[this.pageSize-1].id;
      }
      await this.getMyList();
    }
    
  }

  //ALL SEARCH's
  searchChanged(event: Event) {
    let newSearchValue= (event.target as HTMLInputElement).value;
    this.searchString= newSearchValue;
    this.searchSubject.next( newSearchValue );
  }
  async launchSearch(){
    this.pageIndex=0;
    this.idToGetDocumentSnap= undefined;
    this.isNext= undefined;
    //this.sortDirection= undefined;
    //this.columnToSort= undefined;
    //this.resetRowSort();
    
    this.triggerCount=true;
    await this.getMyList();
    this.triggerCount=false;
  }
  
}
