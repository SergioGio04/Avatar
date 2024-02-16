import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { Auth, getAuth } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class ServiceFirebase2Service {
  firebaseInstance:any;
  firebaseDB: any;
  firebaseAuth: Auth;

  constructor() { 
    this.firebaseInstance= initializeApp(environment.firebaseConfig);
    this.firebaseDB= getFirestore(this.firebaseInstance);
    this.firebaseAuth= getAuth(this.firebaseInstance);

  }




}



  

