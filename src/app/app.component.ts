import { Component } from '@angular/core';
import { ProductServiceService } from './product/product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'; 
import { RouterLinkActive } from '@angular/router';
import { environment } from '../environments/environment';
import { ProductsComponent } from './product/product-list/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    ProductsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = environment?.name;
  repoProducts: any;

  constructor(private FirstServiceService:ProductServiceService) { }

  ngOnInit(){
    //console.log("CIAO" +  this.title);
  }

}
