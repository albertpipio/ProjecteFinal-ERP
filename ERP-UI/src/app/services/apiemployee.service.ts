import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiemployeeService {

  url: string = 'https://localhost:5001/employee';

  constructor(
    private _http: HttpClient
  ) { }

  getEmployees():Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(employee: Employee):Observable<Response>{
    return this._http.post<Response>(this.url, employee, httpOption);
  }

  edit(employee: Employee):Observable<Response>{
    return this._http.put<Response>(this.url, employee, httpOption);
  }

  delete(id: string):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}
