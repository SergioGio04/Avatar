import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './product-list/products.component';
import { ProductComponent } from './product-detail/product.component';

export const productRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':idProduct', component: ProductComponent },
];


@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
