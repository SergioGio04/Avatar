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
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends RegistrationBase {  

  /*
    public firebase: FirebaseManagerService, 
    public router: Router,
    public route: ActivatedRoute
  */
  constructor(injector: Injector){
    super(injector);
  }




}
