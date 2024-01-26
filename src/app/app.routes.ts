import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { productRoutes } from './product/product-routing.module';
import { categoryRoutes } from './category/category-routing.module';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', children: productRoutes },
    //{ path: 'categories', children: categoryRoutes }
];

