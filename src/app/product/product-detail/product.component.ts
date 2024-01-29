import { Component } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ProductServiceService } from '../product-service.service';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  profileForm = new UntypedFormGroup({
    id: new UntypedFormControl(undefined),
    brand: new UntypedFormControl(undefined),
    title: new UntypedFormControl(undefined),
    description: new UntypedFormControl(undefined)
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
      await this.GetP(params["idProduct"]);
   });
  }

  isNew():boolean {
    return this.product?.id ? false : true;
  }

  async GetP(id: string){
    try{
      this.loading=true;
      this.product= await this.FirstServiceService.getDetail(id);
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
        let resAdd= await this.FirstServiceService.create(new Product(this.profileForm.value)); 
        this.loading=false;
        this.product=resAdd;
        //torna indietro di uno(toglie lo 0)
        this.router.navigate(["../"+ resAdd.id ], {relativeTo: this.route});
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
          debugger;
          this.loading=true;

          /*
          let ObjectFModel = Object.assign(
            { id: this.product?.id },
            this.profileForm.value
          );
          */          
            let instanceP= new Product(this.profileForm.value);
            //instanceP.id= this.product?.id;

          let resAdd= await this.FirstServiceService.update(instanceP); 
          //let resAdd= await this.FirstServiceService.UpdateProduct(new Product(this.profileForm.value)); 
          
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
      let resAdd= await this.FirstServiceService.delete(this.product!); 
      this.loading=false;
      alert(resAdd);
      this.router.navigate(["../" ]); 
    }
    catch(error){
      console.error(error);
      this.loading=false;
    } 
  }
  

}

