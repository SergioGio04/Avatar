import { Component, Injector } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {MatInputModule} from '@angular/material/input';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RegistrationBase } from '../registration-base';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    MatInputModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent extends RegistrationBase {

  constructor(injector: Injector){
    super(injector);
  }

}
