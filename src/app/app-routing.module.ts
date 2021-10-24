import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent}
    ]),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
