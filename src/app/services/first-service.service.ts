import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'any' })

export class FirstServiceService {

  standardUrl: string = "https://dummyjson.com/products";


  constructor(private http: HttpClient) { }

  async getProducts(): Promise<Product[]> {

    var promise = new Promise<Product[]>((resolve, reject) => {
      this.http.get<any>(this.standardUrl).subscribe((data: any) => {
        let arrayProducts = data.products;
        let newArrayProducts = arrayProducts.map((objProduct: any) => {
          return new Product(objProduct);
        });
        resolve(newArrayProducts);
      });

      /*
      this.http.get<any>(`${this.standardUrl}/${idElement}`).subscribe((data: any)=>{
        var product= new Product(data);      
        resolve(product);
      });       
      */
    });
    return promise;
    //return this.http.get<any>(this.standardUrl);    
  }


  getProductObservable(idElement: number): Observable<Product> {
    var observable = new Observable<Product>((observer) => {
      this.http.get<any>(`${this.standardUrl}/${idElement}`).subscribe((data: any) => {
        var product = new Product(data);
        observer.next(product);
      });
    });
    return observable;
  }

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

}
