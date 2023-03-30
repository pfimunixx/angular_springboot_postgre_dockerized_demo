import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { RegisterView } from './views/register/register.component';
import { LoginView } from './views/login/login.component';

import { RouterModule, Routes } from '@angular/router';


const appRoutes:Routes=[
  {path:'register', component:RegisterView},
  {path:'login', component:LoginView}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,

    RegisterView,
    LoginView
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
