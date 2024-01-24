import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './product-list/products.component';
import { ProductComponent } from './product-detail/product.component';


export const categoryRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':idProduct', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
