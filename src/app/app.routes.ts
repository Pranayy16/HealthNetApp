import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth-component/auth-component')
        .then(m => m.AuthComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./components/unauthorized/unauthorized')
        .then(m => m.Unauthorized)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: 'doctor',
        canActivate: [roleGuard],
        data: { roles: ['DOCTOR'] },
        loadComponent: () =>
          import('./components/auth-component/auth-component')
            .then(m => m.AuthComponent)
      },
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./components/auth-component/auth-component')
            .then(m => m.AuthComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
