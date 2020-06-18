import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from '../app.config'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  /** GET login codes from the server */
  getLogin(username: string, password: string) {
    const URL = `${AppConfig.ApiBaseURL}/auth`;
    this.http
      .post<HttpResponse<any>>(
        URL,
        { username: username, password },
        { observe: 'response' }
      )
      .subscribe(
        (response) => {
          let token = response.headers.get('Authorization');
          if (token) {
            localStorage.setItem(AppConfig.LocalStorageKeys.TOKEN, token);
            //this.cookieService.set('authorization-key', token);
          }
          this.isLoggedIn.next(!!token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // * Check if logged in */
  public loggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  // * Get authorization token */
  public getAuthorizationToken(): string {
    return localStorage.getItem(AppConfig.LocalStorageKeys.TOKEN);
  }

  // * Logout */
  public logOut(): void {
    this.isLoggedIn.next(false);
    localStorage.clear();
  }

  /** POST: add a new user to the server */
  postRegister(user: User): Observable<any> {
    const serverURL = AppConfig.ApiBaseURL + '/user/UserController/newUser';
    return this.http.post<User>(serverURL, user).pipe(
      map((result) => (result as unknown) as string),
      catchError(this.handleError<any>('postRegister'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the user know how to register properly
      console.log(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
