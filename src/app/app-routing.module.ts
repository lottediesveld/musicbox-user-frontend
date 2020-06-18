import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {Authentication} from './app-routing-guards';
import {from} from 'rxjs';
import {AccountComponent} from './account/account.component';
import {SongDetailComponent} from './song-detail/song-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [Authentication]},
  { path: 'account', component: AccountComponent, canActivate: [Authentication]},
  { path: 'song-detail', component: SongDetailComponent, canActivate: [Authentication]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
