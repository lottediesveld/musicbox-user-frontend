import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {Playlist} from '../models/playlist';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Song} from '../models/song';
import {AddToPlaylistDTO} from '../models/AddToPlaylistDTO';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlists: Playlist[];

  constructor(private http: HttpClient) { }

  get playlists(): Playlist[] {
    return this._playlists;
  }

  addToPlaylist(song: Song, playlist: Playlist) {
    const URL = `${AppConfig.ApiBaseURL}/playlist/PlaylistController/addSong`;

    var DTO = new AddToPlaylistDTO(song, playlist);
    var jsonObject = JSON.stringify(DTO);
    console.log(jsonObject);
    return this.http.post<Playlist[]>(URL, jsonObject).pipe(
      map((result) => (result as unknown) as string),
      catchError(this.handleError<any>('postAddToPlaylist'))
    );
  }

  removeFromPlaylist(song: Song, playlist: Playlist) {
    const URL = `${AppConfig.ApiBaseURL}/playlist/PlaylistController/deleteSongFromPlaylist`;

    var DTO = new AddToPlaylistDTO(song, playlist);
    var jsonObject = JSON.stringify(DTO);
    console.log(jsonObject);
    return this.http.post<Playlist>(URL, jsonObject).pipe(
      map((result) => (result as unknown) as string),
      catchError(this.handleError<any>('postAddToPlaylist'))
    );
  }

  getAllPlaylists() {
    var id = Number(localStorage.getItem(AppConfig.LocalStorageKeys.USER));
    console.log(id);
    const URL = `${AppConfig.ApiBaseURL}/playlist/PlaylistController/allPlaylists/?id=` + id;

    return this.http.get<Playlist[]>(URL)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
