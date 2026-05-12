import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { ComplianceComponent } from './components/compliance-component/compliance-component';
import { AboutComponent } from './components/about-component/about-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { OutbreakFormComponent } from './components/outbreak-component/outbreak-component';
import { OutbreakListComponent } from './components/outbreak-component/outbreak-list/outbreak-list';
import { OutbreakDashboardComponent } from './components/outbreak-component/outbreak-dashboard/outbreak-dashboard';
import { OutbreakUpdateComponent } from './components/outbreak-component/outbreak-update/outbreak-update';
import { OutbreakDetailComponent } from './components/outbreak-component/outbreak-detail/outbreak-detail';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

const OUTBREAK_ROLES = ['Admin', 'Doctor', 'Public Health Officer'];

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'compliance', component: ComplianceComponent },
    { path: 'about', component: AboutComponent },
    { path: 'unauthorized', redirectTo: 'home', pathMatch: 'full' },

    // ── Outbreak module ────────────────────────────────────────
    {
        path: 'outbreaks',
        component: OutbreakDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: OUTBREAK_ROLES }
    },
    {
        path: 'outbreaks/list',
        component: OutbreakListComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: OUTBREAK_ROLES }
    },
    {
        path: 'outbreaks/new',
        component: OutbreakFormComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin', 'Public Health Officer'] }
    },
    {
        path: 'outbreaks/:id/edit',
        component: OutbreakUpdateComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin', 'Public Health Officer'] }
    },
    {
        path: 'outbreaks/:id',
        component: OutbreakDetailComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: OUTBREAK_ROLES }
    },
];
