import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })

export class FirstServiceService {

  standardUrl:string="https://dummyjson.com/products";

  constructor(private http: HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get<any>(this.standardUrl);    
  }

  getProduct(idElement:number):Observable<any>{
    return this.http.get<any>(this.standardUrl+"/"+idElement); 
  }

}
