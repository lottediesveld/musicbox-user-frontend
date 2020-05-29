import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {Playlist} from '../models/playlist';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlists: Playlist[];

  constructor(private http: HttpClient) { }

  get playlists(): Playlist[] {
    return this._playlists;
  }

  getAllPlaylists() {
    const URL = `${AppConfig.ApiBaseURL}/playlist/PlaylistController/allPlaylists`;

    return this.http.get<Playlist[]>(URL)

    //   .pipe
    // (
    //   map(result=> { return result[''] as Playlist[]} ),
    //   catchError(this.handleError('getAllPlaylists', []))
    // );
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
