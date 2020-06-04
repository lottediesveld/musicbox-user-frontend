import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../REST/authentication.service';
import {UserService} from '../REST/user.service';
import {Playlist} from '../models/playlist';
import {User} from '../models/user';
import {AppConfig} from '../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginResult: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.getLogin(this.username, this.password);
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
