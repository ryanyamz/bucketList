import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private base = '/api/user';

  constructor(
    private http: Http,
    private cookieService: CookieService
  ) {}

  login(user: User): Observable<User> {
    console.log('in UserService login');
    return this.http.get(`${this.base}/login`)
      .map(response => response.json());
  }

  logout(): Promise<User> {
    return this.http.delete(`${this.base}/logout`)
      .map(response => response.json())
      .toPromise();
  }

  getUser(id: string): Observable<User> {
    return this.http.get(`${this.base}/${id}`)
      .map(response => response.json());
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.base)
      .map(response => response.json())
      .toPromise();
  }

  getUserID() {
    console.log('userID')
    return this.cookieService.get('userID');
  }

}


