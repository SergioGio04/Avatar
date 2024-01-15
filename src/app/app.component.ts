import { Component } from '@angular/core';
import { FirstServiceService } from './first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Avatar';
  repoProducts: any;

  constructor(private FirstServiceService:FirstServiceService) {
  }

}
