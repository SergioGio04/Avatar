import { Injectable } from '@angular/core';
import { FirebaseManagerService } from './firebase-manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InitializerConfigService {

  constructor(private firebase: FirebaseManagerService, private router: Router) { }

  async initializerCond(){    
    await this.firebase.initUser();
    return true;
  }

}
