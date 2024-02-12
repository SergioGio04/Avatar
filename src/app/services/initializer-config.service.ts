import { Injectable } from '@angular/core';
import { FirebaseManagerService } from './firebase-manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InitializerConfigService {

  constructor(private firebase: FirebaseManagerService, private router: Router) { }

  async initializerCond(){
    let user= await this.firebase.getLoggedUser();
    if(user == undefined){
      this.router.navigate([this.router.url, "login" ]);
    }
    return user;
      
  }

}
