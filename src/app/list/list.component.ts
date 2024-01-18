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
    try{
      this.repoProducts= await this.FirstServiceService.getProducts();
    }
    catch(error){
      console.error(error);
    }
  }

  ChangeRoute(prm:any){
      this.router.navigate(["element", prm.id]);
  }

}
