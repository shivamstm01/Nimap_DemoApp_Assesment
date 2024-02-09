import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './Components/editprofile/editprofile.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    ProfileComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
