import { Component } from '@angular/core';
import { Category } from '../category';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { CategoryServiceService } from '../category-service.service';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  profileForm = new UntypedFormGroup({
    id: new UntypedFormControl(undefined),
    brand: new UntypedFormControl(undefined),
    title: new UntypedFormControl(undefined),
    description: new UntypedFormControl(undefined)
  });
  product?:Category;
  loading:boolean= false;

  constructor(
    private categoryServiceService:CategoryServiceService, 
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
      this.product= await this.categoryServiceService.getDetail(id);
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
        let resAdd= await this.categoryServiceService.create(new Category(this.profileForm.value)); 
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
            let instanceP= new Category(this.profileForm.value);
            //instanceP.id= this.product?.id;

          let resAdd= await this.categoryServiceService.update(instanceP); 
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
      let resAdd= await this.categoryServiceService.delete(this.product!); 
      this.loading=false;
      alert(resAdd);
      //this.router.navigate(["../" ]);
      this.router.navigate(["../" ], {relativeTo: this.route}); 
    }
    catch(error){
      console.error(error);
      this.loading=false;
    } 
  }
  

}

