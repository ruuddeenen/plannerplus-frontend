// Firebase services + environment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

// Services
import { AuthService } from "./shared/services/auth.service";

// Components
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToolbarComponent } from './toolbar/toolbar.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    VerifyEmailComponent,
    ToolbarComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
