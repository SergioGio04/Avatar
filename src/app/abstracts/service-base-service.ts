import { Injectable, Injector, forwardRef } from "@angular/core";
import { Product } from "../product/product";
import { ProductServiceService } from "../product/product-service.service";
import { Category } from "../category/category";
import { AggregateQuerySnapshot, OrderByDirection, Query, QueryDocumentSnapshot, addDoc, and, collection, deleteDoc, doc, endAt, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, or, orderBy, query, startAfter, startAt, updateDoc, where } from "firebase/firestore";
import { FirebaseManagerService } from "../services/firebase-manager.service";
import { ModelBase } from "./model-base";
import { BaseParams } from "./base-params";
import { retry } from "rxjs";
import { environment } from "../../environments/environment.development";
import { BaseParameters } from "./base-parameters";

import { httpsCallable } from "firebase/functions";
//@Injectable({ providedIn: 'root' })


export abstract class ServiceBase<T extends ModelBase, P extends BaseParameters>  {

    protected firebase: FirebaseManagerService;

    constructor(public injector: Injector) {
        this.firebase = injector.get(FirebaseManagerService);
    }

    abstract getNameCollection(): string;
    abstract getModelInstance(json?: any): T;

    async getQuery(
        numberOfElements?: number,
        idToGetDocumentSnap?: string | undefined,
        getnext?: number | undefined,
        sortDirection?: OrderByDirection | undefined,
        columnToSort?: string | undefined,
        searchString?:string|undefined
    ): Promise<[Query,number] > {
            let q = query(collection( this.firebase.db, this.getNameCollection() ));
            let valueCount= 0;

            //GET COUNT OF ALL ELEMENTS IN COLLECTION RETURNED FROM QUERY
            if( searchString==undefined || searchString=="" || searchString==null){           
                valueCount= await this.getRunTimeCountElementsDB(q);
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
                }
                //COUNT ELEMENT RETRIVED FROM DB
                if( (searchString != undefined && searchString!="" && searchString!=null)  ){
                    valueCount= await this.getRunTimeCountElementsDB(q);
                }

                q = query(q, limit(numberOfElements));
                
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
                            q = query(q, 
                                orderBy("id", "asc"),  
                                endBefore(docSnap), 
                                limitToLast(numberOfElements)
                            );
                        }
                    }
                    //forward
                    if (getnext == 2) {
                        q = query(q, startAfter(docSnap));
                    }
                }

                //GENERA ERRORE QUANDO VAI INDIETRO DI 1, RITORNA ALLA PRIMA PAGINA
                //q = query(q, limit(numberOfElements));
                                    
            }      
        return [q, valueCount];
    }

    //async getAdditionalQuery(q: Query, dynamicParam: GetDynamicParams): Promise<[Query, number|undefined]>{
    async getAdditionalQuery(q: Query, dynamicParam?: BaseParameters): Promise<Query>{
        return q ;
    }

    additionalSelectQueryBigQuery(){}
    additionalWhereBigQuery(isWhereUsed:boolean, dynamicParam:BaseParameters){}

    async getRunTimeCountElementsDB(q:Query): Promise<number>{
        try{
            let snapshotCount = await getCountFromServer(q).then( (snapshot) => {
                return snapshot.data().count;
            });
            //var valueCount= snapshotCount.data().count;
            return snapshotCount;
        }
        catch(error){
            throw(error);
        }
    }

    async getList( baseParams?:BaseParams, dynamicParam?:BaseParameters ): Promise<[T[], number|boolean]> {
        try {
            var list: T[] = [];
            let valueCount= 0;

            var searchString= baseParams?.searchString;
            var numberOfElements= baseParams?.numberOfElements;
            var columnToSort= baseParams?.columnToSort;
            var sortDirection= baseParams?.sortDirection;
            var idToGetDocumentSnap= baseParams?.idToGetDocumentSnap;
            var getnext= baseParams?.getnext;
            var pageIndex= baseParams?.pageIndex;

            if( dynamicParam?.fromBigQuery==false || dynamicParam?.fromBigQuery==undefined){
                let q = query(collection( this.firebase.db, this.getNameCollection() ));
                //GET COUNT OF ALL ELEMENTS IN COLLECTION RETURNED FROM QUERY
                if( searchString==undefined || searchString=="" || searchString==null){           
                    valueCount= await this.getRunTimeCountElementsDB(q);
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
                    }
                    
                    //QUERY CUSTOM!
                    //FILTRAGGIO PER CATEGORY(INSERIMENTO ADDITIONAL QUERY)
                    q= await this.getAdditionalQuery(q, dynamicParam);
                    

                    //COUNT ELEMENT RETRIVED FROM DB
                    if( (searchString != undefined && searchString!="" && searchString!=null) || 
                        dynamicParam!=undefined ){
                        valueCount= await this.getRunTimeCountElementsDB(q);
                    }

                    //NB TUTTI I COUNT DOPO IL LIMIT SONO ANNULLATI!
                    q = query(q, limit(numberOfElements));
                    
                    //FILTRAGGI FORWARD/BACKWARD
                    if (idToGetDocumentSnap != undefined && getnext != undefined) {
                        const docRef = doc(this.firebase.db,this.getNameCollection(), idToGetDocumentSnap);
                        const docSnap = await getDoc(docRef);
                        //backward
                        if (getnext == false) {
                            //
                            if(sortDirection!=undefined && columnToSort!=undefined){
                                q = query(q, endBefore(docSnap), limitToLast(numberOfElements));
                            }
                            else{
                                q = query(q, 
                                    orderBy("id", "asc"),  
                                    endBefore(docSnap), 
                                    limitToLast(numberOfElements)
                                );
                            }
                        }
                        //forward
                        if (getnext == true) {
                            q = query(q, startAfter(docSnap));
                        }
                    }

                    //GENERA ERRORE QUANDO VAI INDIETRO DI 1, RITORNA ALLA PRIMA PAGINA
                    //q = query(q, limit(numberOfElements));
                                        
                }  
                var res = await getDocs(q);
                res.docs.forEach((d) => {
                    list.push(this.getModelInstance(d.data()));                    
                });
            }
            else{
                let query='WITH CTE AS(\
                        SELECT\
                        JSON_EXTRACT_SCALAR(data, "$.id") AS id,'+
                        this.additionalSelectQueryBigQuery()+
                        'JSON_EXTRACT_STRING_ARRAY(data, "$.lowercaseSearch") as lowercaseSearch,\
                        DATA AS data\
                        FROM `'+environment.firebaseConfig.projectId+'.firestore_export.'+this.getNameCollection()+'_raw_latest`\
                    )\
                    SELECT * FROM CTE\
                ';
                let isWhereUsed= false; 
                if(searchString){
                    query+=' WHERE ';
                    isWhereUsed=true;
                }

                if(searchString){
                    //query+=`${searchString.toLocaleLowerCase()} IN UNNEST(CTE.lowercaseSearch)`;
                    query+='"'+searchString.toLocaleLowerCase()+'" IN UNNEST (CTE.lowercaseSearch) ';
                }
                
                query+=this.additionalWhereBigQuery(isWhereUsed, dynamicParam);
                if( columnToSort && sortDirection ){
                    //query+=`ORDER BY ${columnToSort} ${sortDirection}`;
                    query+=' ORDER BY '+columnToSort + ' '+sortDirection;
                }
                if(numberOfElements){
                    //query += ` LIMIT ${numberOfElements}`;
                    query += ' LIMIT '+numberOfElements;
                }
                if(numberOfElements && pageIndex){
                    //query += `OFFSET ${numberOfElements * pageIndex}`;
                    query += ' OFFSET '+numberOfElements * pageIndex;
                }

                console.log(query);
                //TODO
                //senza deploy devi lanciare il serve functions
                
                debugger;

                let callBigQuery= httpsCallable(this.firebase.firebaseFunctions, "callbigquery2");
                await callBigQuery(query)
                .then((result:any) => {
                    let data = result.data;
                    if(data){
                        for(let obj of data){
                            list.push(this.getModelInstance(obj.data));     
                        }
                    }
                });
                

            }
            
            return ([list, valueCount]);
        }
        catch (error) {
            throw(error);
        }
    }

    async getListFiller( baseParams?:BaseParams, dynamicParam?:P ){
        let result= await this.getList(baseParams, dynamicParam);
        await this.getModelsCollection(result[0]);
        return result;
    }

    async getModelsCollection(items:T[]){
        let arrayPromise= [];
        for(let item of items){     
            let promise= item.fillModels(this.injector);
            arrayPromise.push(promise);
        } 
        Promise.all(arrayPromise).then((values) => {
            console.log("done");
        });


    }

    async create(model: T): Promise<T> {
        let p = new Promise<T>(async (resolve, reject) => {
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

    //prms, se vuoi il category e cosa vuoi impostare come title
    async getListCollection(defaultSelectConfig?: { [key: string|number]: any }): Promise<T[]>{
        let [list]= await this.getList();
        if(defaultSelectConfig && defaultSelectConfig["enabled"]==true){
            let defaultSetter:any= {
                "id": defaultSelectConfig["value"],
                "title": defaultSelectConfig["label"]
            }
            let categoryNone= this.getModelInstance();
            categoryNone.setData(defaultSetter);
            list.splice(0, 0, categoryNone);
        }
        return list;
    }

}

