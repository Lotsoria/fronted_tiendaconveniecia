import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from "src/app/global-component";
import { Observable } from 'rxjs';

const URL_API = GlobalComponent.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(`${URL_API}/sell/create`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
  }

  saveSale(data: any): Observable<any> {
    const token = localStorage.getItem("token");
    console.log(data)
    return this.http.post<any>(`${URL_API}/sell/save`, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
  }
}
