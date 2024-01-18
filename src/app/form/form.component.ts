import { Component } from '@angular/core';
import { FirebaseManagerService } from '../services/firebase-manager.service';
import { Product } from '../models/product';
import { collection, getDocs, query } from 'firebase/firestore'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../services/crudServiceContenitor/crud.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  profileForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });

  constructor( private firebase: FirebaseManagerService, private crudService: CrudService){}

  Get() {
    debugger;
    //console.log(this.profileForm.status);
    if(this.profileForm.status=="VALID"){
      
    }

    console.log(this.profileForm.value);
  }

  onSubmit() {
    debugger;
    //console.log(this.profileForm.status);
    console.log(this.profileForm.value);
  }

}
