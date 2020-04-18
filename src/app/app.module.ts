// Firebase services + environment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

// Services
import { AuthService } from "./shared/services/auth/auth.service";

// Components
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from "@angular/common/http";
import { EmployeesComponent } from './employees/employees.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EmployeesComponent,
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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
