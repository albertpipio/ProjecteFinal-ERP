import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiorderService {

  url: string = 'https://localhost:5001/order';

  constructor(
    private _http: HttpClient
  ) { }

  getOrders():Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(order: Order):Observable<Response>{
    return this._http.post<Response>(this.url, order, httpOption);
  }

  edit(order: Order):Observable<Response>{
    return this._http.put<Response>(this.url, order, httpOption);
  }

  delete(id: string):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}
