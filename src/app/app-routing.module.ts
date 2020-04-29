import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard services
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages-auth/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth/auth.guard';

// Components
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeesComponent } from './components/employees/employees.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:uuid', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
