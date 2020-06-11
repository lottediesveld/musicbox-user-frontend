import { Component } from '@angular/core';
import {AuthenticationService} from './REST/authentication.service';
import {NavigationExtras, Router} from '@angular/router';
import {AppConfig} from './app.config';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {MusicService} from './REST/music.service';
import {User} from './models/user';
import {Song} from './models/song';
import {UserService} from './REST/user.service';

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
    private userService: UserService,
    private router: Router
  ) {
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.authService.loggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        this.userService.getCurrentUser().subscribe((data: User) => {
          localStorage.setItem(AppConfig.LocalStorageKeys.USER, String(data.id));
          if(localStorage.getItem(AppConfig.LocalStorageKeys.USER) === String(data.id)){
            console.log(data.id);
            this.router.navigateByUrl('/home');
          }
        });
      } else {
        console.log(AppConfig.LocalStorageKeys.TOKEN);
        localStorage.removeItem(AppConfig.LocalStorageKeys.TOKEN);
        this.router.navigateByUrl('/login');
      }
    });
  }

  openHome(): void {
    this.router.navigateByUrl('/account', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  searchSongs(event: any): void {
    if (event.keyCode === 13) {
      console.log("search");
      this.musicService.searchSongs(event.target.value).subscribe((data: Song[]) => {
        this.songs = data;
        console.log(data);
        if (this.songs != null){
          localStorage.setItem(AppConfig.LocalStorageKeys.PLAYLIST, "playlist");
          this.openSongs(this.songs);
        }
      });
    }
  }

  openSongs(songs: Song[]): void {
    console.log("routerlink");
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/song-detail'], {state: {data: {songs}}});
    });
  }
}
