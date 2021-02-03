import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from '../models/response';
import { User } from "../models/user";
import { map } from 'rxjs/operators';
import { Login } from "../models/login";

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class ApiAuthService {
  url: string = 'https://localhost:5001/user/login';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  public get userData(): User {
    return this.userSubject.value;
  }

  constructor(private _http: HttpClient) {
    this.userSubject =
      new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  login(login: Login): Observable<Response> {
    return this._http.post<Response>(this.url, login, httpOption)
      .pipe(
        map(res => {
          if (res.exito === 1) {
            const user: User = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}