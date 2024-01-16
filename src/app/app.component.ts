import { Component } from '@angular/core';
import { FirstServiceService } from './services/first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ElementComponent } from './element/element.component';
import { RouterLink } from '@angular/router'; 
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Avatar';
  repoProducts: any;

  constructor(private FirstServiceService:FirstServiceService) {
  }

}
