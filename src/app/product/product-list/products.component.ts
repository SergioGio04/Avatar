import { Component, Inject, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProductComponent } from '../product-detail/product.component';
import { Product } from '../product';
import { IProductService } from '../../abstracts/i-product-service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  repoProducts?:Product[];

  constructor(private FirstServiceService:IProductService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try{
      this.repoProducts= await this.FirstServiceService.getProducts();
    }
    catch(error){
      console.error(error);
    }
  }

  ChangeRoute(id:string|number|undefined){
      if(id!= undefined){
        this.router.navigate(["products", id]);
      }      
  }

}
