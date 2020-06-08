import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../REST/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-acoount',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data: User) => {
      this.user = data;
    });
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
