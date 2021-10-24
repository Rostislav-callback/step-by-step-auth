import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './auth/login/login.component';
import { PrsonalDataComponent } from './auth/signup/prsonal-data/prsonal-data.component';
import { LocationComponent } from './auth/signup/location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    AboutUsComponent,
    LoginComponent,
    PrsonalDataComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
