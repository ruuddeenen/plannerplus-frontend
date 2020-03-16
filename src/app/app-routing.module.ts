import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Guard services
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "verify-email-address", component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
