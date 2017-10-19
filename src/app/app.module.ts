import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { ReferenceService } from './services/reference.service';
import { ChapterService } from './services/chapter.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { routing } from './app.routing';
import { TabsComponent } from './components/tabs/tabs.component';
import { SectionComponent } from './components/section/section.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    TabsComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [ AuthService, ReferenceService, ValidateService, ChapterService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
