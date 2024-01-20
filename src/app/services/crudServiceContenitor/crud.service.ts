import { Injectable } from '@angular/core';
import { FirebaseManagerService } from '../firebase-manager.service';
import { collection, getDoc, getDocs, setDoc, query, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private firebase: FirebaseManagerService){}

  //Promise<Product>
  GetProduct(id: string): Promise<Product>{
    var promise= new Promise<Product>(async(resolve, reject) => { 
      try{
        const docRef = doc(this.firebase.db, "products", id);
        const readDoc = (await getDoc(docRef)).data();
        let product= new Product(readDoc);
        resolve(product)
      }
      catch(err){
        reject(err);
      }
    });
    return promise;
  }

  AddProduct(objForm: FormGroup): Promise<any>{
    let p= new Promise( async(resolve,reject)=> {
      debugger;   
      try{
        let executionAdd= await setDoc(doc(this.firebase.db, "products", objForm.value.id), objForm.value);
        //let executionAdd= await addDoc(collection(this.firebase.db, "products"), objForm.value);
        debugger;
        resolve("ELEMENT ADDED");
      } 
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR AddProduct " + error);
      }   
    })
    return p;
  }

  UpdateProduct(objForm: FormGroup): Promise<any>{
    let p= new Promise( async(resolve,reject)=> {
      debugger;   
      try{
        const docRef = doc(this.firebase.db, "products", objForm.value.id);
        let executionUpdate= await updateDoc(docRef, objForm.value);
        debugger;
        resolve("ELEMENT UPDATED!");
      } 
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR UpdateProduct " + error);
      }   
    })
    return p;
  }

  DeleteProduct(id: string): Promise<any>{
    let p= new Promise( async(resolve,reject)=> {
      debugger;   
      try{
        let executionDelete= await deleteDoc(doc(this.firebase.db, "products", id));
        debugger;
        resolve("ELEMENT DELETED!");
      } 
      catch(error){
        //console.error("ERROR AddProduct " + error );
        reject("ERROR DeleteProduct " + error);
      }   
    })
    return p;
  }
 
}
