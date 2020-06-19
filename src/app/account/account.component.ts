import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../REST/user.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-acoount',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  styles: [
    `
      .redClass { color: red }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  user: User;
  show: boolean;
  newPassword1: string;
  newPassword2: string;
  succes: boolean;
  successMessage: string;

  visibilityChange: Subject<boolean> = new Subject<boolean>();
  stringChange: Subject<string> = new Subject<string>();

  constructor(private userService: UserService,
              private router: Router,
              private changeDetection: ChangeDetectorRef) {
    this.visibilityChange.subscribe((value) => {
      this.show = value; this.changeDetection.detectChanges();
    });
    this.stringChange.subscribe((value) => {
      this.successMessage = value; this.changeDetection.detectChanges();
    })
  }

  ngOnInit(): void {
    this.show = false;
    this.succes = false;
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data: User) => {
      this.user = data;
    });
  }

  changePassword(): void {
    if (this.newPassword1 === this.newPassword2) {
      this.userService.changePassword(this.newPassword1).subscribe( (data) => {
        console.log(data);
        if (data === "saved"){
          this.succes = true;
          this.successMessage = "Password updated!"
          this.show=true;
        } else {
          this.succes = false;
          this.successMessage = "Oops something went wrong"
          this.show=true;
        }
      })
    } else {
      this.succes = false;
      this.successMessage = "Passwords don't match"
      this.show=true;
    }
  }

  deleteUser(): void {
    this.userService.deleteUser().subscribe((data:string) => {
      if (data === "successful"){
        alert("User deleted successfully");
        this.router.navigate(["/login"]);
      }
    });
  }
}
