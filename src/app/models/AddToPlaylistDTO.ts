import {Song} from './song';
import {Playlist} from './playlist';

export class AddToPlaylistDTO {
  private song: Song;
  private playlist: Playlist;


  constructor(song: Song, playlist: Playlist) {
    this.song = song;
    this.playlist = playlist;
  }
}
