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

import { RegisterView } from './views/register/register.component';
import { LoginView } from './views/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';

const appRoutes:Routes=[
  {path:'register', component:RegisterView},
  {path:'user-portal', component:UserPortalComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginView},
  {path:'users', component:UsersComponent}
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
    ProfilesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
