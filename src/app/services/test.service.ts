import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  Saluto(){
    return "test del primo servizio saluto!!"
  }

}
