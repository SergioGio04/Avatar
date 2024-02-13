import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, Unsubscribe, User, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";

@Injectable({providedIn: 'root'})

export class FirebaseManagerService {
  myFirebase:FirebaseApp;
  db:Firestore;  
  firebaseAuth: Auth;

  user: User|null;
  errorAuth: string;

  unsubscribe: Unsubscribe;

  constructor() {
    this.myFirebase= initializeApp(environment.firebaseConfig);
    this.db= getFirestore(this.myFirebase);
    this.firebaseAuth= getAuth(this.myFirebase);
    
  }

  isAuthenticated(){
    //let res= await this.getLoggedUser();
    return this.user!=null? true : false;
  }

  async initUser(){
    return await this.getLoggedUser();
  }

  async getLoggedUser(){   
    return new Promise((resolve, reject) => {      
      this.unsubscribe= onAuthStateChanged(this.firebaseAuth, user => {   
          this.user = user;
          resolve(user);
      }, reject);
    });
  }

  //ISCRIVITI
  async signUp(email?:string, password?:string){
    if(email != undefined && password!=undefined){
      await createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }); 
    }
  }

  //LOGGATI
  async signIn(email?:string, password?:string){
    if(email != undefined && password!=undefined){
      await signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
        this.errorAuth= error.message;
      });
    }
  }

  updateEmailPassword(email?:string, password?:string){
    if(this.firebaseAuth.currentUser!=null){
      if(email!=undefined){
        updateEmail(this.firebaseAuth.currentUser, email).then(() => {
          console.log("email Updated!")
        }).catch((error) => {
          console.log(error);
        });
      }
      if(password!=undefined){
        updatePassword(this.firebaseAuth.currentUser, password).then(() => {
          console.log("password Updated!")
        }).catch((error) => {
          console.log(error);
        });
      }
    }
    
  }

  async logout(){
    await signOut(this.firebaseAuth).then((dt) => {
      this.user= null;
    }).catch((error) => {
      // An error happened.
    });
  }


}
