import {Component, Input, OnInit} from '@angular/core';
import {AppConfig} from '../app.config';
import {PlaylistService} from '../REST/playlist.service';
import {Playlist} from '../models/playlist';
import {MusicService} from '../REST/music.service';
import {Router} from '@angular/router';
import {Song} from '../models/song';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() x=0;
  @Input() y=0;
  @Input() song;
  @Input() currentPlaylist;

  playlistBoolean: boolean;
  playlists: Playlist[];
  songs: Song[];

  constructor(private playlistService: PlaylistService,
              private musicService: MusicService,
              private router: Router) {
    this.songs = new Array();
  }

  ngOnInit(): void {
    this.getPlaylists();
    if (localStorage.getItem(AppConfig.LocalStorageKeys.PLAYLIST) !== "playlist"){
      this.playlistBoolean = true;
    } else {
      this.playlistBoolean = false;
    }
  }

  getPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe((data: Playlist[]) => {
      this.playlists = data;
    });
  }

  addToPlaylist(playlist: Playlist): void {
    this.playlistService.addToPlaylist(this.song, playlist).subscribe((data: Playlist[]) => {
      this.playlists = data;
    });
  }

  removeFromPlaylist(): void {
    var songs;
    this.playlistService.removeFromPlaylist(this.song, this.currentPlaylist).subscribe((data: Playlist) => {
      songs = data.songs
      for (var j=0; j< songs.length; j++) {
        var i = 0;
        this.musicService.getSongById(songs[j].id).subscribe((data: Song)=> {
          this.songs.push(data);
          i++;
          if (i == songs.length){
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/song-detail'], {state: {data: {songs: this.songs}}});
            });
          }
        })
      }
    });
  }
}
