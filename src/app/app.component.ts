import { Component } from '@angular/core';
import { FirstServiceService } from './services/first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'; 
import { RouterLinkActive } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = environment?.name;
  repoProducts: any;

  constructor(private FirstServiceService:FirstServiceService) { }

  ngOnInit(){
    debugger;
    console.log("CIAO" +  this.title);
  }

}
