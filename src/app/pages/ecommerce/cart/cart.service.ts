import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from "src/app/global-component";

const URL_API = GlobalComponent.AUTH_API;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(    private http: HttpClient) { }

  getProduct() {
    const token = localStorage.getItem("token");
    const data = this.http.get<any>(`${URL_API}product/list`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
    return data;
  }
}
