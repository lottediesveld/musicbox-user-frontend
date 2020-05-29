export class Song {
  private _id: number;
  private _title: string;
  private _album: string;
  private _artist: string;

  constructor() {
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
}
