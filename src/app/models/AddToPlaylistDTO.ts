import {Song} from './song';
import {Playlist} from './playlist';

export class AddToPlaylistDTO {
  private song: number;
  private playlist: number;


  constructor(song: number, playlist: number) {
    this.song = song;
    this.playlist = playlist;
  }
}
