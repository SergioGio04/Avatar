import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';

import { ServiceBase } from './service-base-service';
import { ProductServiceService } from '../product/product-service.service';
import { RouteReuseStrategy } from '@angular/router';
import { ModelBase } from './model-base';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  template: ``,
})
export abstract class DetailBaseComponent< T extends ModelBase,M extends ServiceBase<T> > {

  form:UntypedFormGroup; 
  private route: ActivatedRoute;
  private router: Router;
  model?:T;
  loading:boolean= false;

  constructor(injector: Injector) {
    this.route= injector.get(ActivatedRoute);
    this.router= injector.get(Router);
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(undefined)
    });
    this.initializationForm();
    
    this.route.params.subscribe(async (params:any) => {
      await this.getDetail(params[this.getParamsId()]);
   });
  }

  abstract initializationForm():void;
  abstract getParamsId():string;
  abstract getModel(json?:any):T;
  abstract getService():M;

  isNew():boolean {
    return this.model?.id ? false : true;
  }

  async getDetail(id: string){
    try{
      this.loading=true;
      this.model= await this.getService().getDetail(id);
      this.loading=false;
      console.log(this.model);
      //this.profileForm.controls["brand"].setValue(this.product!.brand!);
      this.form.patchValue(this.model);
    }
    catch(error){
      console.error(error);
      this.loading=false;
    }
  }

  async add(){    
    if(this.form.valid){
      try{
        this.loading=true;
        let resAdd= await this.getService().create(this.getModel(this.form.value)); 
        this.loading=false;
        this.model=resAdd;
        //torna indietro di uno(toglie lo 0)
        this.router.navigate(["../"+ resAdd.id ], {relativeTo: this.route});
      }
      catch(error){
        console.error(error);
        this.loading=false;
      } 
    }
    
  }

  async update(){
      if(this.form.valid ){
        try{
          debugger;
          this.loading=true;

          /*
          let ObjectFModel = Object.assign(
            { id: this.product?.id },
            this.profileForm.value
          );
          */          
            let instanceP= this.getModel(this.form.value);
            //instanceP.id= this.product?.id;

          let resAdd= await this.getService().update(instanceP); 
          //let resAdd= await this.FirstServiceService.UpdateProduct(new Product(this.profileForm.value)); 
          
          this.loading=false;
          alert(resAdd); 
          await this.getDetail(this.model!.id!);
          //this.router.navigate(["/element/"+ this.profileForm.value.id ]);         
        }
        catch(error){
          console.error(error);
          this.loading=false;
        } 
      }
  }
  async delete(){    
    try{
      this.loading=true;
      let resAdd= await this.getService().delete(this.model!); 
      this.loading=false;
      alert(resAdd);
      this.router.navigate(["../" ], {relativeTo: this.route}); 
    }
    catch(error){
      console.error(error);
      this.loading=false;
    } 
  }
  

}

