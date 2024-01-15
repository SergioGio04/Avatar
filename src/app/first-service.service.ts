import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {

  constructor(private http: HttpClient) { }

  getProducts():Observable<any> {
    debugger;
    const url= "https://dummyjson.com/products";
    return this.http.get<any>(url);    
  }

}
