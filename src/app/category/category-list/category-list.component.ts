import { Component, Inject, OnInit } from '@angular/core';
import { CategoryServiceService } from '../category-service.service';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryComponent } from '../category-detail/category.component';
import { Category } from '../category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, CategoryComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})

//export class CategoryListComponent implements OnInit {
export class CategoryListComponent  {

  repoProducts?:Category[];

  constructor(
    private CategoryServiceService:CategoryServiceService, 
    private router: Router,
    private route: ActivatedRoute,
  ) {}
/*
  async ngOnInit(): Promise<void> {
    try{
      this.repoProducts= await this.CategoryServiceService.getList();
    }
    catch(error){
      console.error(error);
    }
  }

  ChangeRoute(id:string|number|undefined){
      if(id!= undefined){
        this.router.navigate(["./", id], {relativeTo: this.route});
      }      
  }
*/
}
