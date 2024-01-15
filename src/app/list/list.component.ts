import { Component, OnInit } from '@angular/core';
import { FirstServiceService } from '../first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  repoProducts: any;

  constructor(private FirstServiceService:FirstServiceService) {}

  ngOnInit(): void {
    this.FirstServiceService.getProducts().subscribe((data: any)=>{
      debugger;
      if(data && data.products){
        this.repoProducts= data.products;
      }
      
    })
  }

}
