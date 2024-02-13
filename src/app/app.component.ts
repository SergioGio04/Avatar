import { Component } from '@angular/core';
import { ProductServiceService } from './product/product-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'; 
import { RouterLinkActive } from '@angular/router';
import { environment } from '../environments/environment';
import { ProductsComponent } from './product/product-list/products.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DockModule } from 'primeng/dock';
import { MenuItem } from 'primeng/api';

import { FirebaseManagerService } from './services/firebase-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    ProductsComponent,
    MatMenuModule,
    MatButtonModule,
    ButtonModule,
    DropdownModule,
    DockModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = environment?.name;
  repoProducts: any;
  constructor(public firebase: FirebaseManagerService, private router: Router, private route: ActivatedRoute) { }

}
