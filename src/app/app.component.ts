import { Component } from '@angular/core';
import {AuthenticationService} from './REST/authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from './app.config';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'musicbox-user';
  home = faHome;
  loggedIn = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.authService.loggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        this.router.navigateByUrl('/home');
      } else {
        console.log(AppConfig.LocalStorageKeys.TOKEN);
        localStorage.removeItem(AppConfig.LocalStorageKeys.TOKEN);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
