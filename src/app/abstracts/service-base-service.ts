import { Injectable, Injector, forwardRef } from "@angular/core";
import { Product } from "../product/product";
import { CustomProductServiceService } from "../services/custom-product-service.service";
import { ProductServiceService } from "../product/product-service.service";
import { Category } from "../category/category";
import { AggregateQuerySnapshot, OrderByDirection, QueryDocumentSnapshot, addDoc, and, collection, deleteDoc, doc, endAt, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, or, orderBy, query, startAfter, startAt, updateDoc, where } from "firebase/firestore";
import { FirebaseManagerService } from "../services/firebase-manager.service";
import { ModelBase } from "./model-base";

@Injectable({
    providedIn: 'root',
    //useClass: forwardRef(() => ProductServiceService)
})

export abstract class ServiceBase<T extends ModelBase>{

    protected firebase: FirebaseManagerService;

    constructor(injector: Injector) {
        this.firebase = injector.get(FirebaseManagerService);
    }

    abstract getNameCollection(): string;
    abstract getModelInstance(json?: any): T;

    /*
    async getCountDocumentsCollection(): Promise<number> {
        var promise = new Promise<number>(async (resolve, reject) => {
            try {
                const coll = collection(this.firebase.db, this.getNameCollection());
                const snapshot = await getCountFromServer(coll);
                resolve(snapshot.data().count);
            }
            catch (err) {
                reject(err);
            }
        });
        return promise;
    }
    */

    async getList(
        numberOfElements?: number,
        idToGetDocumentSnap?: string | undefined,
        getnext?: number | undefined,
        sortDirection?: OrderByDirection | undefined,
        columnToSort?: string | undefined,
        searchString?:string|undefined,
        selectedId?:string|number|undefined
    ): Promise<[T[], number|boolean]> {
        var promise = new Promise<[T[], number|boolean]>(async (resolve, reject) => {
            try {
                let q = query(collection( this.firebase.db, this.getNameCollection() ));
                let valueCount= 0;

                //GET COUNT OF ALL ELEMENTS IN COLLECTION RETURNED FROM QUERY
                if( searchString==undefined || searchString=="" || searchString==null){                    
                    let snapshotCount = await getCountFromServer(q);
                    valueCount= snapshotCount.data().count;
                }
                if ( numberOfElements != undefined ) {

                    //FILTRAGGIO SORTING
                    if( sortDirection!=undefined && columnToSort!=undefined){
                        q= query(q, orderBy(columnToSort, sortDirection));
                    }
                    //FILTRAGGIO SEARCH
                    if( searchString != undefined && searchString!="" && searchString!=null ){
                        q = query(q, 
                            where("lowercaseSearch", "array-contains", searchString.toLocaleLowerCase() ),
                        );
                        
                        //GET COUNT OF ALL ELEMENTS IN COLLECTION RETURNED FROM QUERY AFTER SEARCH
                        //let snapshotCount = await getCountFromServer(q);
                        //valueCount= snapshotCount.data().count;
                                            
                    }

                    //FILTRAGGIO SelectedCategory
                    if( selectedId!=undefined && selectedId!=null && selectedId!=0 ){
                        q = query(q, where("categoryId", "==", selectedId ) );
                    }

                    //COUNT ELEMENT RETRIVED FROM DB
                    if( (searchString != undefined && searchString!="" && searchString!=null) || 
                        (selectedId!=undefined && selectedId!=null && selectedId!=0) ){
                        let snapshotCount = await getCountFromServer(q);
                        valueCount= snapshotCount.data().count;
                    }

                    //q = query(q, limit(numberOfElements));
                    
                    //FILTRAGGI FORWARD/BACKWARD
                    if (idToGetDocumentSnap != undefined && getnext != undefined) {
                        const docRef = doc(this.firebase.db,this.getNameCollection(), idToGetDocumentSnap);
                        const docSnap = await getDoc(docRef);
                        //backward
                        if (getnext == 1) {
                            //
                            if(sortDirection!=undefined && columnToSort!=undefined){
                                q = query(q, endBefore(docSnap), limitToLast(numberOfElements));
                            }
                            else{
                                q = query(q, orderBy("id", "asc"),  endBefore(docSnap), limitToLast(numberOfElements));
                            }
                        }
                        //forward
                        if (getnext == 2) {
                            q = query(q, startAfter(docSnap));
                        }
                    }

                    q = query(q, limit(numberOfElements));
                                        
                }                
                
                var list: T[] = [];
                var res = await getDocs(q);
                res.docs.forEach((d) => {
                    list.push(this.getModelInstance(d.data()));                    
                });
                resolve([list, valueCount]);
            }
            catch (error) {
                reject(error);
            }
        });
        return promise;
    }

    async create(model: T): Promise<T> {
        let p = new Promise<T>(async (resolve, reject) => {
            debugger;
            try {
                //NB: Metti "Transaction firestore"        
                let executionAdd = await addDoc(collection(this.firebase.db, this.getNameCollection()), model.getData());
                model.id = executionAdd.id;
                await this.update(model);
                resolve(model);
            }
            catch (error) {
                reject("ERROR AddProduct " + error);
            }
        })
        return p;
    }

    async update(model: T): Promise<T> {
        let p = new Promise<T>(async (resolve, reject) => {
            debugger;
            try {
                const docRef = doc(this.firebase.db, this.getNameCollection(), model.id!);
                await updateDoc(docRef, model.getData());
                resolve(model);
            }
            catch (error) {
                reject("ERROR UpdateProduct " + error);
            }
        })
        return p;
    }

    async getDetail(id: string): Promise<T> {
        var promise = new Promise<T>(async (resolve, reject) => {
            try {
                const docRef = doc(this.firebase.db, this.getNameCollection(), id);
                const readDoc = (await getDoc(docRef)).data();
                let model = this.getModelInstance(readDoc);
                resolve(model)
            }
            catch (err) {
                reject(err);
            }
        });
        return promise;
    }

    async delete(model: T): Promise<void> {
        let p = new Promise<void>(async (resolve, reject) => {
            try {
                await deleteDoc(doc(this.firebase.db, this.getNameCollection(), model.id!));
                resolve();
            }
            catch (error) {
                reject("ERROR DeleteProduct " + error);
            }
        })
        return p;
    }

}

