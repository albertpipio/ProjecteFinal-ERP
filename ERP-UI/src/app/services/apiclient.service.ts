import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  url: string = 'https://localhost:5001/client';

  constructor(
    private _http: HttpClient
  ) { }

  getClients():Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(client: Client):Observable<Response>{
    return this._http.post<Response>(this.url, client, httpOption);
  }

  edit(client: Client):Observable<Response>{
    return this._http.put<Response>(this.url, client, httpOption);
  }

  delete(id: string):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}
