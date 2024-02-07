import { Component } from '@angular/core';
import { ProductServiceService } from './product/product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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

  items: MenuItem[] | undefined;

  position: string = 'top';

  positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
  ];
  constructor(private FirstServiceService:ProductServiceService) { }

  ngOnInit() {
    this.items = [
        {
            path: "/products",
            label: 'Finder',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
        },
        {
            path: "/categories",
            label: 'App Store',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
        },
        {
            path: "/bottles",
            label: 'Photos',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
        },
        {
            path: "/home",
            label: 'Trash',
            icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
        }
    ];
}

}
