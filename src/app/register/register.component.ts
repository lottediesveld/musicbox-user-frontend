import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {user} from '../models/user';
import { AuthenticationService } from '../REST/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  newuser: user;

  passwordConfirm: string;
  result: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.newuser = new user(this.username, this.email, this.password);
    if (this.password === this.passwordConfirm) {
      this.authenticationService.postRegister(this.newuser).subscribe(
        result => {
          if (result === 'saved') {
            this.router.navigate(['dashboard']);
          }
        }
      );
    } else {
      alert('Make sure passwords match.');
    }
  }
}
