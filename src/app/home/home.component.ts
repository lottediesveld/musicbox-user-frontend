import { Component, OnInit } from '@angular/core';
// For MDB Angular Free
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import {Router} from '@angular/router';
import {PlaylistService} from '../REST/playlist.service';
import {Playlist} from '../models/playlist';
import {forEachComment} from 'tslint';
import {MusicService} from '../REST/music.service';
import {Song} from '../models/song';
import {AppConfig} from '../app.config';
import {User} from '../models/user';
import {AuthenticationService} from '../REST/authentication.service';
import {UserService} from '../REST/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playlists : Playlist[];
  // songs : Song[];
  user: User;
  private searchField : String;

  constructor( private router: Router,
               private playlistService: PlaylistService,
               private userService: UserService) {
  }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.userService.getCurrentUser().subscribe((data: User) => {
      localStorage.setItem(AppConfig.LocalStorageKeys.USER, String(data.id));
      this.playlistService.getAllPlaylists().subscribe((data: Playlist[]) => {
        this.playlists = data;
      });
    });
  }

  openPlaylist(playlist: Playlist): void {
    localStorage.setItem(AppConfig.LocalStorageKeys.PLAYLIST, playlist.title);
    var songs = playlist.songs;
    this.router.navigate(["/song-detail"], {state: {data: {songs, playlist}}});
  }
}
