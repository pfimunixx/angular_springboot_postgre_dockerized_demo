import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { MovementsComponent } from './components/movements/movements.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

import { RegisterView } from './views/register/register.component';
import { LoginView } from './views/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { PaginatePipe } from './pipes/paginate.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { SendPasswordRestoreComponent } from './components/send-password-restore/send-password-restore.component';
import { PasswordRestoreComponent } from './components/password-restore/password-restore.component';

const appRoutes:Routes=[
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterView},
  {path:'user-portal', component:UserPortalComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginView},
  {path:'users', component:UsersComponent},
  {path:'send-password-restore', component:SendPasswordRestoreComponent},
  {path:'password-restore/:userCode', component:PasswordRestoreComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegisterView,
    LoginView,
    UsersComponent,
    MovementsComponent,
    UserPortalComponent,
    ProfilesComponent,
    PaginatePipe,
    EmailVerificationComponent,
    ActivateAccountComponent,
    SendPasswordRestoreComponent,
    PasswordRestoreComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
