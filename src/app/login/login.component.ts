import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FirebaseManagerService } from '../services/firebase-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(
    public firebase: FirebaseManagerService, 
    public router: Router,
    public route: ActivatedRoute
  ){}

  loginForm = new UntypedFormGroup ({
      email: new UntypedFormControl(undefined, [Validators.required]),
      password: new UntypedFormControl(undefined, [Validators.required]),
  });

  async callSignInSignUpFunction(wantedSign: number) {
    debugger;
    //console.log(this.profileForm.status);
    console.log(this.loginForm.value);
    if(this.loginForm.status == "VALID"){
      debugger;
      if(wantedSign==0){
        await this.firebase.signIn(this.loginForm.value.email, this.loginForm.value.password);
      }
      if(wantedSign==1){
        await this.firebase.signUp(this.loginForm.value.email, this.loginForm.value.password);
      }      
      if(this.firebase.user){
        this.router.navigate(["../" ], {relativeTo: this.route});
      }
    }
  }


}
