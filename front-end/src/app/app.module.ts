import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './views/users/users.component';

import { RegisterView } from './views/register/register.component';
import { LoginView } from './views/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { MovementsComponent } from './movements/movements.component';


const appRoutes:Routes=[
  {path:'register', component:RegisterView},
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
    CreateProfileComponent,
    MovementsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
