import {Song} from './song';

export class Playlist {
  private _id: number;
  private _userId: number;
  private _title: string;
  private _songs: Array<Song>;

  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._userId;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get songs(): Array<Song> {
    return this._songs;
  }

  set addSong(song: Song) {
    this._songs.push(song);
  }
}
