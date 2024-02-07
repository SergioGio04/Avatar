import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottleListComponent } from '../bottle-list/bottle-list.component';
import { BottleDetailComponent } from '../bottle-detail/bottle-detail.component';


export const bottleRoutes: Routes = [
  { path: '', component: BottleListComponent },
  { path: ':idBottle', component: BottleDetailComponent },
];

