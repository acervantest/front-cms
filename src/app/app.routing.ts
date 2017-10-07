import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders} from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { DASHBOARD_ROUTES } from './dashboard.routes';

const APP_ROUTES: Routes = [
    { path:'', component: HomeComponent, pathMatch: 'full'},
    { path:'login', component: LoginComponent },
    { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: DASHBOARD_ROUTES},
    { path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path:'register', component: RegisterComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);