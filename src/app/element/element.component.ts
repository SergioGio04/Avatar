import { Component, Input, OnInit } from '@angular/core';
import { FirstServiceService } from '../services/first-service.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss'
})
export class ElementComponent {
  @Input()idElement?:number;

  objElement:any;
  constructor(private FirstServiceService:FirstServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //let id= this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params) => {
      console.log(params);
      let id= params["idElement"];

      this.FirstServiceService.getProduct(id).subscribe((data: any)=>{
        debugger;
        console.log(data);
        this.objElement= new Product(data);
      })
    });
  
  }

  ngOnDestroy(){
    console.log("destroy");
  } 

}

