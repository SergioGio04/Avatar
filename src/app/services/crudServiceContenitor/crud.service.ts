import { Injectable } from '@angular/core';
import { FirebaseManagerService } from '../firebase-manager.service';
import { collection, getDoc, getDocs, query, doc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firebase: FirebaseManagerService){}


  //Promise<Product>
  async GetProduct(id: string){
    const docRef = doc(this.firebase.db, "products", id);
    const docSnap = await getDoc(docRef);
    
  }


}
