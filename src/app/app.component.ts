import { Component } from '@angular/core';
import {AuthenticationService} from './REST/authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from './app.config';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {MusicService} from './REST/music.service';
import {User} from './models/user';
import {Song} from './models/song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'musicbox-user';
  home = faHome;
  loggedIn = false;
  songs: Song[];

  constructor(
    private authService: AuthenticationService,
    private musicService: MusicService,
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

  searchSongs(event: any): void {
    if (event.keyCode === 13) {
      this.musicService.searchSongs(event.target.value).subscribe((data: Song[]) => {
        this.songs = data;
      });
    }
  }
}
