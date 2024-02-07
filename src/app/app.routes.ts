import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { productRoutes } from './product/product-routing.module';
import { categoryRoutes } from './category/category-routing.module';
import { bottleRoutes } from './bottle/routing/bottle-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', children: productRoutes },
    { path: 'categories', children: categoryRoutes },
    { path: 'bottles', children: bottleRoutes },
    { path: 'home', component: HomePageComponent  }
    
];

