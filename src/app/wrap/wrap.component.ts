import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsComponent } from '../product/product-list/products.component';
import { MenuItem } from 'primeng/api';
import { environment } from '../../environments/environment';
import { FirebaseManagerService } from '../services/firebase-manager.service';

@Component({
  selector: 'app-wrap',
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
  templateUrl: './wrap.component.html',
  styleUrl: './wrap.component.scss'
})
export class WrapComponent {
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
  constructor(public firebase: FirebaseManagerService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.items = [
            {
                path: "/products",
                label: 'Products',
                icon: '../assets/images/product.png'
            },
            {
                path: "/categories",
                label: 'Categories',
                icon: '../assets/images/categories.png'
            },
            {
                path: "/bottles",
                label: 'Bottles',
                //icon: '../assets/images/bottles2.png'
                icon: '../assets/images/bottles.png'
            },
            {
                path: "/home",
                label: 'Home', 
                icon: '../assets/images/home4.png'
            },
            /*
            {
                path: "/hero",
                label: 'Hero', 
                icon: '../assets/images/hero.png'
            }
            */
        ];
    }

    async callLogOut(){
        await this.firebase.logout();
        this.router.navigate(["login"]);
    }

}
