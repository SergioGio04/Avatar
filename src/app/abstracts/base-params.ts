import { Injectable, Inject, Injector } from "@angular/core";
import { OrderByDirection } from "firebase/firestore";

export class BaseParams {

    numberOfElements?: number;
    idToGetDocumentSnap?: string;
    getnext?: boolean;
    sortDirection?: OrderByDirection;
    columnToSort?: string;
    searchString?:string;
    pageIndex?: number;

    constructor( 
        numberOfElements?: number,
        idToGetDocumentSnap?: string,
        getnext?: boolean,
        sortDirection?:OrderByDirection,
        columnToSort?: string,
        searchString?: string,
        pageIndex?: number
    ) {
        this.numberOfElements= numberOfElements;
        this.idToGetDocumentSnap= idToGetDocumentSnap;
        this.getnext= getnext;
        this.sortDirection= sortDirection;
        this.columnToSort= columnToSort;
        this.searchString= searchString;
        this.pageIndex= pageIndex;
    }

}

