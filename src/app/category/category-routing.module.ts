import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category-detail/category.component';


export const categoryRoutes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: ':idCategory', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
