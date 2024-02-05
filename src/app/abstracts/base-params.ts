import { Injectable, Inject, Injector } from "@angular/core";
import { OrderByDirection } from "firebase/firestore";

export class BaseParams {

    numberOfElements?: number;
    idToGetDocumentSnap?: string | undefined;
    getnext?: number | undefined;
    sortDirection?: OrderByDirection | undefined;
    columnToSort?: string | undefined;
    searchString?:string|undefined;

    constructor( 
        numberOfElements?: number,
        idToGetDocumentSnap?: string | undefined,
        getnext?: number | undefined,
        sortDirection?:OrderByDirection | undefined,
        columnToSort?: string | undefined,
        searchString?: string | undefined
    ) {
        this.numberOfElements= numberOfElements;
        this.idToGetDocumentSnap= idToGetDocumentSnap;
        this.getnext= getnext;
        this.sortDirection= sortDirection;
        this.columnToSort= columnToSort;
        this.searchString= searchString;

    }

}

