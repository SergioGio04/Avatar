import { Inject, Injectable, Injector } from '@angular/core';
import { CategoryServiceService } from '../category/category-service.service';

@Injectable({
  providedIn: 'root'
})
export abstract class TestService {

  constructor( 
    injector: Injector, 
    @Inject("prm") prm?:any
  ) {
    console.log(prm);
    
    console.log(injector);
  }

}
