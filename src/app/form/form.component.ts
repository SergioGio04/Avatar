import { Component } from '@angular/core';
import { FirebaseManagerService } from '../services/firebase-manager.service';
import { Product } from '../models/product';
import { collection, getDocs, query } from 'firebase/firestore'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../services/crudServiceContenitor/crud.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  profileForm = new FormGroup({
    //id: new FormControl('', [Validators.required]),
    id: new FormControl(''),
    brand: new FormControl(''),
    title: new FormControl(''),
  });
  product?:Product;

  constructor( private crudService: CrudService){}

  async GetP() {
    let id= this.profileForm.value.id != (null || undefined) ? this.profileForm.value.id : null;
    if(this.profileForm.status=="VALID" && id!=null){
      try{
        this.product= await this.crudService.GetProduct(id); 
      }
      catch(error){
        console.error(error);
      } 
    }

    console.log(this.profileForm.value);
  }

  async AddP(){
    let id= this.profileForm.value.id != (null || undefined) ? this.profileForm.value.id : null;
    
    if(this.profileForm.status=="VALID" && id!=null ){
      try{
        let resAdd= await this.crudService.AddProduct(this.profileForm); 
        alert(resAdd);
      }
      catch(error){
        console.error(error);
      } 
    }
  }

  async UpdateP(){
    let id= this.profileForm.value.id != (null || undefined) ? this.profileForm.value.id : null;
    
    if(this.profileForm.status=="VALID" && id!=null ){
      try{
        let resAdd= await this.crudService.UpdateProduct(this.profileForm); 
        alert(resAdd);
      }
      catch(error){
        console.error(error);
      } 
    }
  }

  async DeleteP(){
    let id= this.profileForm.value.id != (null || undefined) ? this.profileForm.value.id : null;
    
    if(this.profileForm.status=="VALID" && id!=null ){
      try{
        let resAdd= await this.crudService.DeleteProduct(id); 
        alert(resAdd);
      }
      catch(error){
        console.error(error);
      } 
    }
  }

}
