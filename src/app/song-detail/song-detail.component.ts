import {Component, Input, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {Playlist} from '../models/playlist';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  songs: Song[];
  playlist: Playlist;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  clickedSong: Song;

  constructor() {
    this.songs = history.state.data.songs;
    this.playlist = history.state.data.playlist;
  }

  ngOnInit(): void {
    console.log(this.songs);
  }

  //activates the menu with the coordinates
  onrightClick(song, event){
    this.contextmenuX=event.clientX
    this.contextmenuY=event.clientY
    this.clickedSong=song
    this.contextmenu=true;
  }
  //disables the menu
  disableContextMenu(){
    this.contextmenu= false;
  }

}
