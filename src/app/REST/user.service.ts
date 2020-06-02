import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const URL = `${AppConfig.ApiBaseURL}/user/UserController/current`;

    return this.http.get<User>(URL)
  }
}
