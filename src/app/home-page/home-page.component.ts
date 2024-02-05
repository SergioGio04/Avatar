import { Component, Inject, Injector } from '@angular/core';
import { ProductsComponent } from '../product/product-list/products.component';
import { TestService } from '../services/test.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent extends TestService{

  casa:string="ciaone"
  constructor(injector: Injector){
    super(injector, "ciapo");
    
  }

}
