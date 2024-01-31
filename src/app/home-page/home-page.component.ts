import { Component } from '@angular/core';
import { ProductsComponent } from '../product/product-list/products.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
