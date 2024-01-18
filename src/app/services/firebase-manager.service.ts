import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { Firestore, getFirestore } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseManagerService {
  myFirebase:FirebaseApp;
  db:Firestore;  
  constructor() {
    this.myFirebase= initializeApp(environment.firebaseConfig);
    console.log(this.myFirebase);
    this.db= getFirestore(this.myFirebase);
  }
}
