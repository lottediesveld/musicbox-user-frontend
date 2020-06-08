export class Song {
  private _id: number;
  private _title: string;
  private _album: string;
  private _artist: string;

  constructor() {
    this._title = "";
    this._album = "";
    this._artist = "";
  }


  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get album(): string {
    return this._album;
  }
  get artist(): string {
    return this._artist;
  }

  set setTitle(value: string) {
    this._title = value;
  }

  set setAlbum(value: string) {
    this._album = value;
  }

  set setArtist(value: string) {
    this._artist = value;
  }
}
