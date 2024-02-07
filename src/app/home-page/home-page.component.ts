import { Component, Inject, Injector } from '@angular/core';
import { ProductsComponent } from '../product/product-list/products.component';
import { TestService } from '../services/test.service';
import { Character } from '../models/character';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  casa:string="ciaone"
  getInstance:Character;
  
  constructor(injector: Injector){
    //super(injector, "ciapo");
    this.getInstance= new Character({
      id:"ono",
      search: "meSearch",
      name: "meName",
      power: "mePower"
    })
    debugger;
  }

}
