import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Guard services
import {SecureInnerPagesGuard} from './shared/guard/secure-inner-pages-auth/secure-inner-pages.guard';
import {AuthGuard} from './shared/guard/auth/auth.guard';
// Components
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {PlanningComponent} from './components/planning/planning.component';
import {DepPlanningComponent} from './components/dep-planning/dep-planning.component';
import {PlannerComponent} from './components/planner/planner.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:uuid', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'planning', component: PlanningComponent, canActivate: [AuthGuard]},
  {path: 'planning/:uuid', component: PlanningComponent, canActivate: [AuthGuard]},
  {path: 'dep_planning', component: DepPlanningComponent, canActivate: [AuthGuard]},
  {
    path: 'manage', canActivate: [AuthGuard], children: [{
      path: 'planner', component: PlannerComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
