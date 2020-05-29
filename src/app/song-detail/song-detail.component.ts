import {Component, Input, OnInit} from '@angular/core';
import {Song} from '../models/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  songs: Song[];

  constructor() {
    this.songs = history.state.data.songs;
  }

  ngOnInit(): void {
    console.log(this.songs);
  }

}
