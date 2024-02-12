import { Component } from '@angular/core';
import { ServiceFirebase2Service } from '../../services/service-firebase2.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})

export class HeroListComponent {

    constructor(fb:ServiceFirebase2Service ){
      console.log( fb.firebaseDB);
      console.log( "ciao");
      console.log( fb.firebaseAuth);
    } 
}
