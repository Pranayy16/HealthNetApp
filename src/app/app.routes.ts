import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { ComplianceComponent } from './components/compliance-component/compliance-component';
import { AboutComponent } from './components/about-component/about-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { OutbreakComponent } from './components/outbreak-component/outbreak-component';
import { ProfileComponent } from './components/profile-component/profile-component';
import { UpdateUserComponent } from './components/update-user-component/update-user-component';
import { roleGuard } from './core/guards/role-guard';
import { DeleteUserComponent } from './components/delete-user-component/delete-user-component';
import { Unauthorized } from './components/unauthorized/unauthorized';
import { SymptomHistoryComponent } from './components/symptomhistory-component/symptomhistory-component';
import { SymptomReportComponent } from './components/symptomreport-component/symptomreport-component';
import { CitizenhomeComponent } from './components/citizenhome-component/citizenhome-component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent },
    { path: 'compliance', component: ComplianceComponent},
    { path: 'about', component: AboutComponent},
    { path: "outbreaks", component: OutbreakComponent },
    { path: "profile", component: ProfileComponent},
    { path: 'symptom-history', component: SymptomHistoryComponent },
    { path: 'symptom-report', component: SymptomReportComponent },
    { path: 'citizen-home', component: CitizenhomeComponent },
    { path: "update", component: UpdateUserComponent, canActivate: [roleGuard], data: { roles: ['Admin']} },
    { path: "delete", component: DeleteUserComponent, canActivate: [roleGuard], data: { roles: ['Admin']} },
    { path: "unauthorized", component: Unauthorized },
];
