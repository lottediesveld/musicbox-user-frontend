import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { User } from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const URL = `${AppConfig.ApiBaseURL}/user/UserController/current`;

    return this.http.get<User>(URL);
  }

  changePassword(newPass: string) {
    const URL = `${AppConfig.ApiBaseURL}/user/UserController/changepass`;

    return this.http.post<string>(URL, newPass);
  }

  deleteUser() {
    const URL = `${AppConfig.ApiBaseURL}/user/UserController/delete`

    return this.http.delete<string>(URL);
  }
}
