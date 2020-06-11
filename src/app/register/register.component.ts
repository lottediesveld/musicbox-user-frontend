import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../REST/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  privacyConfirm: string;

  newuser: User;

  passwordConfirm: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.newuser = new User(this.firstName, this.lastName, this.username, this.email, this.password);
    if (this.privacyConfirm == null){
      alert('Please read and accept the privacy policy!');
    }
    else{
      if (this.password === this.passwordConfirm) {
        console.log(this.privacyConfirm);
        this.authenticationService.postRegister(this.newuser).subscribe(
          result => {
            if (result === 'saved') {
              this.authenticationService.getLogin(this.newuser.username, this.newuser.password)
            }
          }
        );
      } else {
        alert('Make sure passwords match.');
      }
    }
  }
}
