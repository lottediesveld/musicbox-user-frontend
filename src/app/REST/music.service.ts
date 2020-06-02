import { Injectable } from '@angular/core';
import {AppConfig} from '../app.config';
import {Playlist} from '../models/playlist';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Song} from '../models/song';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  searchSongs(search: string) {
    const URL = `${AppConfig.ApiBaseURL}/music/SongController/search/?search=` + search;

    return this.http.get<Song[]>(URL)
  }

  getAllSongs() {
    const URL = `${AppConfig.ApiBaseURL}/music/SongController/all`;

    return this.http.get<Song[]>(URL)
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
