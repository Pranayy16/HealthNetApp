import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
// import { ComplianceComponent } from './components/compliance-component/compliance-component';
import { AboutComponent } from './components/about-component/about-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { OutbreakFormComponent } from './components/outbreak-component/outbreak-component';
import { OutbreakListComponent } from './components/outbreak-component/outbreak-list/outbreak-list';
import { OutbreakDashboardComponent } from './components/outbreak-component/outbreak-dashboard/outbreak-dashboard';
import { OutbreakUpdateComponent } from './components/outbreak-component/outbreak-update/outbreak-update';
import { OutbreakDetailComponent } from './components/outbreak-component/outbreak-detail/outbreak-detail';
import { authGuard } from './core/guards/auth-guard';
// import { roleGuard } from './core/guards/role-guard';

const OUTBREAK_ROLES = ['Admin', 'Doctor', 'Public Health Officer'];
// import { OutbreakComponent } from './components/outbreak-component/outbreak-component';
import { ProfileComponent } from './components/profile-component/profile-component';
import { UpdateUserComponent } from './components/update-user-component/update-user-component';
import { roleGuard } from './core/guards/role-guard';
import { DeleteUserComponent } from './components/delete-user-component/delete-user-component';
import { Unauthorized } from './components/unauthorized/unauthorized';
import { SymptomHistoryComponent } from './components/symptomhistory-component/symptomhistory-component';
import { SymptomReportComponent } from './components/symptomreport-component/symptomreport-component';
import { CitizenhomeComponent } from './components/citizenhome-component/citizenhome-component';


import { LabTestComponent } from './components/lab-test-component/lab-test-component';
import { LabTestDetailComponent } from './components/lab-test-detail-component/lab-test-detail-component';
import { LabTestCreateComponent } from './components/lab-test-create-component/lab-test-create-component';
import { LabTestEditComponent } from './components/lab-test-edit-component/lab-test-edit-component';
import { CreateComplianceComponent } from './components/create-compliance-component/create-compliance-component';
import { ComplianceComponent } from './components/compliance-component/compliance-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create-compliance', component: CreateComplianceComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Compliance Officer']}  },
    { path: 'get-all-compliances', component: ComplianceComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Compliance Officer']} },
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
    { path: 'get-all-compliances', component: ComplianceComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Compliance Officer']} },
    { path: 'about', component: AboutComponent},
    // { path: "outbreaks", component: OutbreakComponent },
    { path: 'lab-tests', component: LabTestComponent, canActivate: [roleGuard], data: { roles: ['Doctor','Lab Technician']} },
    { path: 'lab-tests/create', component: LabTestCreateComponent, canActivate: [roleGuard], data: { roles: ['Doctor','Lab Technician']}},
    { path: 'lab-tests/:id', component: LabTestDetailComponent, canActivate: [roleGuard], data: { roles: ['Doctor','Lab Technician']} },
    { path: 'lab-tests/:id/edit', component: LabTestEditComponent, canActivate: [roleGuard], data: { roles: ['Doctor', 'Lab Technician']} },
    { path: "profile", component: ProfileComponent},
    { path: 'symptom-history', component: SymptomHistoryComponent },
    { path: 'symptom-report', component: SymptomReportComponent },
    { path: 'citizen-home', component: CitizenhomeComponent },
    { path: "update", component: UpdateUserComponent, canActivate: [roleGuard], data: { roles: ['Admin']} },
    { path: "delete", component: DeleteUserComponent, canActivate: [roleGuard], data: { roles: ['Admin']} },
    { path: "unauthorized", component: Unauthorized },
    { path: 'compliance', component: ComplianceComponent }
];
