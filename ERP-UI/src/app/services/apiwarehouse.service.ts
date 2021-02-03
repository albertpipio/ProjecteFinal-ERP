import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../models/warehouse';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiwarehouseService {

  url: string = 'https://localhost:5001/warehouse';

  constructor(
    private _http: HttpClient
  ) { }

  getWarehouse():Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(warehouse: Warehouse):Observable<Response>{
    return this._http.post<Response>(this.url, warehouse, httpOption);
  }

  edit(warehouse: Warehouse):Observable<Response>{
    return this._http.put<Response>(this.url, warehouse, httpOption);
  }

  delete(id: string):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}
