import { Component, Input, OnInit } from '@angular/core';
import { FirstServiceService } from '../services/first-service.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss'
})
export class ElementComponent {
  @Input()idElement?:number;

  objElement?:Product;

  constructor(
    private TestService:TestService, 
    private FirstServiceService:FirstServiceService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //let id= this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(async (params) => {
      console.log(params);
      let id= params["idElement"];
      try{
        this.objElement= await this.FirstServiceService.getProduct(id);
        console.log(this.objElement);
      }
      catch(error){
        console.error(error);
      }
      //var data= await this.FirstServiceService.getProductObservable(id);
    });
  
  }

  RetrieveSalutoService(){
    let saluto:string;
   


  }

  ngOnDestroy(){
    console.log("destroy");
  } 

}

