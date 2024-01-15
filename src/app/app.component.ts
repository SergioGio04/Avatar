import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirstServiceService } from './first-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Avatar';
  repoProducts: any[]= [{}];

  constructor(private FirstServiceService:FirstServiceService) {
  }

  ngOnInit(): void {
    this.FirstServiceService.getProducts().subscribe((data)=>{
      debugger;
      console.log("hey");
      if(data && data.products){
        this.repoProducts= data.products;
      }
      
    })
  }
}
