import { Component } from '@angular/core';
import { Product } from '../models/product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ProductServiceService } from '../services/product-service.service';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss'
})
export class ElementComponent {

  profileForm = new FormGroup({
    brand: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
  });
  product?:Product;
  loading:boolean= false;

  constructor(
    private FirstServiceService:ProductServiceService, 
    private route: ActivatedRoute,
    private router: Router,
    private reuseStrategy: RouteReuseStrategy
  ) {
  }
  ngOnInit(): void {
    //let id= this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(async (params:any) => {
      await this.GetP(params["idElement"]);
   });
  }

  isNew():boolean {
    //return this.product?.id ? false : true;
    if(this.product != undefined){
        let isNew= Object.keys(this.product).length>0 ? false : true;
        return isNew
    }
    return true;    
  }

  async GetP(id: string){
    try{
      this.loading=true;
      this.product= await this.FirstServiceService.getProduct(id);
      this.loading=false;
      console.log(this.product);
      //this.profileForm.controls["brand"].setValue(this.product!.brand!);
      this.profileForm.patchValue(this.product);
    }
    catch(error){
      console.error(error);
      this.loading=false;
    }
  }

  async AddP(){    
    if(this.profileForm.valid){
      try{
        this.loading=true;
        let resAdd= await this.FirstServiceService.AddProduct(new Product(this.profileForm.value)); 
        this.loading=false;
        this.product=resAdd;
        this.router.navigate(["/element/"+ resAdd.id ]);
      }
      catch(error){
        console.error(error);
        this.loading=false;
      } 
    }
  }

  async UpdateP(){
      if(this.profileForm.valid ){
        try{
          this.loading=true;
          let resAdd= await this.FirstServiceService.UpdateProduct(new Product(this.profileForm.value)); 
          this.loading=false;
          alert(resAdd); 
          await this.GetP(this.product!.id!);
          //this.router.navigate(["/element/"+ this.profileForm.value.id ]);         
        }
        catch(error){
          console.error(error);
          this.loading=false;
        } 
      }
  }
  async DeleteP(){    
    try{
      this.loading=true;
      let resAdd= await this.FirstServiceService.DeleteProduct(this.product!); 
      this.loading=false;
      alert(resAdd);
      this.router.navigate(["/list/" ]); 
    }
    catch(error){
      console.error(error);
      this.loading=false;
    } 
  }
  

}

