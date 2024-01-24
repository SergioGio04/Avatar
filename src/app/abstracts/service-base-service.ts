import { Injectable, Injector, forwardRef } from "@angular/core";
import { Product } from "../product/product";
import { CustomProductServiceService } from "../services/custom-product-service.service";
import { ProductServiceService } from "../product/product-service.service";
import { Category } from "../category/category";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { FirebaseManagerService } from "../services/firebase-manager.service";
import { ModelBase } from "./model-base";

@Injectable({
    providedIn: 'root',
    useClass: forwardRef(() => ProductServiceService)
})

export abstract class ServiceBase<T extends ModelBase>{

    protected firebase: FirebaseManagerService;

    constructor(injector: Injector) {
        this.firebase = injector.get(FirebaseManagerService);
    }

    abstract getNameCollection(): string;

    abstract getModelInstance(json?: any): T;

    async getList(): Promise<T[]> {
        var promise = new Promise<T[]>(async (resolve, reject) => {
            try {
                console.log("SONO QUI PRODUCT");
                const q = query(collection(this.firebase.db, this.getNameCollection()));
                var list: T[] = [];
                var res = await getDocs(q);
                res.docs.forEach((d) => {
                    console.log(d.data());
                    list.push(this.getModelInstance(d.data()));
                });
                resolve(list);
            }
            catch (error) {
                console.error(error);
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
                //console.error("ERROR AddProduct " + error );
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
                //console.error("ERROR AddProduct " + error );
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
                //console.error("ERROR AddProduct " + error );
                reject("ERROR DeleteProduct " + error);
            }
        })
        return p;
    }

}

