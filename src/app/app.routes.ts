import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ElementComponent } from './element/element.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: ListComponent },
    { path: 'element/:idElement', component: ElementComponent },
];
