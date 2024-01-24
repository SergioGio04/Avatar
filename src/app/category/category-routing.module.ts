import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './category-list/category-list.component';
import { ProductComponent } from './category-detail/category.component';


export const categoryRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':idProduct', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
