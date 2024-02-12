import { Routes } from "@angular/router";
import { HeroListComponent } from "../hero-list/hero-list.component";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";

export const heroRoutes: Routes = [
    { path: '', component: HeroListComponent },
    { path: ':idHero', component: HeroDetailComponent },
];

