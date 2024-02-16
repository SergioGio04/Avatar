import { Component, Injector } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FirebaseManagerService } from '../services/firebase-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {MatInputModule} from '@angular/material/input';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    MatInputModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
  template: ''
})
export abstract class RegistrationBase {  

  hide:boolean=false;
  firebase:FirebaseManagerService;
  router:Router;
  route: ActivatedRoute;
  constructor(injector: Injector){
    this.firebase= injector.get(FirebaseManagerService);
    this.router= injector.get(Router);
    this.route= injector.get(ActivatedRoute);
  }

  loginForm = new UntypedFormGroup ({
      email: new UntypedFormControl(undefined, [Validators.required, Validators.email]),
      password: new UntypedFormControl(undefined, [Validators.required, Validators.minLength(6)]),
  });

  async callSignInSignUpFunction(wantedSign: number) {
    //console.log(this.profileForm.status);
    console.log(this.loginForm.value);
    if(this.loginForm.status == "VALID"){
      if(wantedSign==0){
        await this.firebase.signIn(this.loginForm.value.email, this.loginForm.value.password);
      }
      if(wantedSign==1){
        await this.firebase.signUp(this.loginForm.value.email, this.loginForm.value.password);
      }      
      if(this.firebase.user){
        this.router.navigate(["../" ], {relativeTo: this.route});
        //this.router.navigate(["/products"]);
      }
    }
  }


}
