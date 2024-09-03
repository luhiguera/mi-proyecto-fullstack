import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./inventory-list/inventory-list.component').then(m => m.InventoryListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.component').then(m => m.AddItemComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-item/:id',
    loadComponent: () => import('./edit-item/edit-item.component').then(m => m.EditItemComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];