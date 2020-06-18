import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../REST/authentication.service';
import {Subject} from 'rxjs';
import {Song} from '../models/song';

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
  show: boolean;
  message: string;

  newuser: User;

  passwordConfirm: string;

  visibilityChange: Subject<boolean> = new Subject<boolean>();
  stringChange: Subject<string> = new Subject<string>();

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private changeDetection: ChangeDetectorRef) {
    this.visibilityChange.subscribe((value) => {
      this.show = value; this.changeDetection.detectChanges();
    });
    this.stringChange.subscribe((value) => {
      this.message = value; this.changeDetection.detectChanges();
    })
  }

  ngOnInit(): void {
    this.show = false;
  }

  register(): void {
    this.newuser = new User(this.firstName, this.lastName, this.username, this.email, this.password);
    if (this.privacyConfirm == null){
      this.message = 'Please read and accept the privacy policy!';
      this.show = true;
    }
    else{
      if (this.password === this.passwordConfirm) {
        this.authenticationService.postRegister(this.newuser).subscribe((result: string) => {
            console.log(result);
            if (result === 'saved') {
              this.authenticationService.getLogin(this.newuser.username, this.newuser.password)
            } else {
              if (result){
                this.message = result;
              } else {
                this.message = "Something went wrong";
              }
              this.show = true;
            }
          }, (err) => {
            this.message = err;
          }
        );
      } else {
        this.message = 'Make sure passwords match.';
        this.show = true;
      }
    }
  }

  login(): void {
    this.router.navigate(['login']);
  }
}
