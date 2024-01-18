import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { collection, getDocs, query } from 'firebase/firestore';

import { FirebaseManagerService } from './firebase-manager.service';

@Injectable({ providedIn: 'any' })

export class FirstServiceService {

  standardUrl: string = "https://dummyjson.com/products";


  constructor(
      private http: HttpClient, 
      //private db: Firestore
      private firebase: FirebaseManagerService
  ) { }

  async getProducts(): Promise<Product[]> {
    var promise = new Promise<Product[]>(async (resolve, reject) => {

      debugger;  
      const q = query(collection(this.firebase.db, "products"));  
        try{
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

  /*
  async getProducts(): Promise<Product[]> {
    var promise = new Promise<Product[]>((resolve, reject) => {
      this.http.get<any>(`${this.standardUrl}`).subscribe({
        next(data){
          let arrayProducts = data.products;
          let newArrayProducts = arrayProducts.map((objProduct: any) => {
            return new Product(objProduct);
          });
          resolve(newArrayProducts);
        },
        error(err){
          reject("ERRORE getProducts: "+ err);
        }      
      });
    });
    return promise;
  }
  */

  getProduct(idElement: number): Promise<Product> {
    var promise = new Promise<Product>((resolve, reject) => {
      this.http.get<any>(`${this.standardUrl}/${idElement}`).subscribe({
        next(data) {
          var product = new Product(data);
          resolve(product);
        },
        error(error) {
          console.error(error);
          reject(error);
        }
      });
    });
    return promise;
  }


  /*
  getProductObservable(idElement: number): Observable<Product> {
    var observable = new Observable<Product>((observer) => {
      this.http.get<any>(`${this.standardUrl}/${idElement}`).subscribe((data: any) => {
        var product = new Product(data);
        observer.next(product);
      });
    });
    return observable;
  }
  */

}
