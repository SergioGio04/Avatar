import { Component, Inject, OnInit } from '@angular/core';
import { FirstServiceService } from '../services/first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ElementComponent } from '../element/element.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ElementComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  repoProducts: any;

  constructor(private FirstServiceService:FirstServiceService, private router: Router) {}

  ngOnInit(): void {
    this.FirstServiceService.getProducts().subscribe((data: any)=>{
      if(data && data.products){
        this.repoProducts= data.products;
      }
      
    })
  }

  ChangeRoute(prm:any){
      this.router.navigate(["element", prm.id]);
  }

}
