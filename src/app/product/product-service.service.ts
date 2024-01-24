import { ImportProvidersSource, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

import { FirebaseManagerService } from '../services/firebase-manager.service';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { IProductService } from '../abstracts/i-product-service';


@Injectable({ providedIn: 'any' })

export class ProductServiceService extends IProductService {
//export class ProductServiceService {

  standardUrl: string = "https://dummyjson.com/products";

  constructor(
      private http: HttpClient, 
      //private db: Firestore
      private firebase: FirebaseManagerService
  ) { 
    super()
  }

  async getProducts(): Promise<Product[]> {
    var promise = new Promise<Product[]>(async (resolve, reject) => {
        try{
          console.log("SONO QUI PRODUCT");
          const q = query(collection(this.firebase.db, "products"));  
          var products: Product[]= [];
          var res= await getDocs(q);
            res.docs.forEach((d)=>{
              console.log(d.data());
              products.push( new Product(d.data()));
          });
          resolve(products);
        }
        catch(error){
          console.error(error);
          reject(error);
        }        

    });
    return promise;
  }

  async getProduct(id: string): Promise<Product> {
    var promise= new Promise<Product>(async(resolve, reject) => { 
      try{
        const docRef = doc(this.firebase.db, "products", id);
        const readDoc = (await getDoc(docRef)).data();
        let product= new Product(readDoc);
        resolve(product)
      }
      catch(err){
        reject(err);
      }
    });
    return promise;
  }

  async AddProduct(product: Product): Promise<Product>{
    let p= new Promise<Product>( async(resolve,reject)=> {
      debugger;   
      try{
        //NB: Metti "Transaction firestore"        
        let executionAdd= await addDoc(collection(this.firebase.db, "products"), product.getData());
        product.id= executionAdd.id;
        await this.UpdateProduct(product);
        resolve(product);
      }
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR AddProduct " + error);
      }   
    })
    return p;
  }

  async UpdateProduct(product: Product): Promise<any>{
    let p= new Promise( async(resolve,reject)=> {
      debugger;   
      try{
        const docRef = doc(this.firebase.db, "products", product.id!);
        let executionUpdate= await updateDoc(docRef, product.getData());
        debugger;
        resolve("ELEMENT UPDATED!");
      } 
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR UpdateProduct " + error);
      }   
    })
    return p;
  }

  async DeleteProduct(product: Product): Promise<any>{
    let p= new Promise( async(resolve,reject)=> {
      debugger;   
      try{
        let executionDelete= await deleteDoc(doc(this.firebase.db, "products", product.id!));
        debugger;
        resolve("ELEMENT DELETED!");
      } 
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR DeleteProduct " + error);
      }   
    })
    return p;
  }

}
