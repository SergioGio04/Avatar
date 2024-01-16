import { Component, Inject, OnInit } from '@angular/core';
import { FirstServiceService } from '../services/first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ElementComponent } from '../element/element.component';
import { Product } from '../models/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ElementComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  repoProducts?:Product[];

  constructor(private FirstServiceService:FirstServiceService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.repoProducts= await this.FirstServiceService.getProducts();
    /*async ()=>{
      debugger;
      this.repoProducts= await this.FirstServiceService.getProducts();
    }*/

    /*
    this.FirstServiceService.getProducts().subscribe((data: any)=>{
      if(data && data.products){
        this.repoProducts= data.products;
      }
    })
    */
  }

  ChangeRoute(prm:any){
      this.router.navigate(["element", prm.id]);
  }

}
