import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./inventory-list/inventory-list.component').then(m => m.InventoryListComponent),
    canActivate: [AuthGuard],  // Protegedia la ruta con AuthGuard
  },
  {
    path: 'add-item',
    loadComponent: () => import('./add-item/add-item.component').then(m => m.AddItemComponent),
    canActivate: [AuthGuard],  
  },
  {
    path: 'edit-item/:id',
    loadComponent: () => import('./edit-item/edit-item.component').then(m => m.EditItemComponent),
    canActivate: [AuthGuard],  
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',  // Redirigir cualquier ruta no definida al login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}