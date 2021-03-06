import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TextinputComponent } from './custom-components/textinput/textinput.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptors } from './REST/http-interceptors/interseptors'
import { CookieService } from 'ngx-cookie-service';
import { Authentication } from './app-routing-guards';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountComponent,
    SongDetailComponent,
    TextinputComponent,
    ContextMenuComponent
  ],
  exports: [AccountComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [Authentication, httpInterceptors, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
