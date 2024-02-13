import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { productRoutes } from './product/product-routing.module';
import { categoryRoutes } from './category/category-routing.module';
import { bottleRoutes } from './bottle/routing/bottle-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { heroRoutes } from './TEST/hero/routing/hero-routing';
import { LoginComponent } from './login/login.component';

import { canActivateTeam } from './services/permission.service';
import { canActivate } from './services/auth/auth-guard';
import { WrapComponent } from './wrap/wrap.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },    
    { path: 'login', component: LoginComponent},
    { path: '', component: WrapComponent, canActivate: [canActivate], children: [
        { path: 'products', children: productRoutes },
        { path: 'categories', children: categoryRoutes },
        { path: 'bottles', children: bottleRoutes },
        { path: 'home', component: HomePageComponent },
        { path: 'hero', children: heroRoutes },
        { path: '**', component: NotFoundComponent }
    ]},
];

