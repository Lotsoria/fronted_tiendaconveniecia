import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/auth.models";
import { GlobalComponent } from "../../global-component";

const URL_API = GlobalComponent.AUTH_API;

@Injectable({ providedIn: "root" })
export class UserProfileService {
  constructor(private http: HttpClient) {}
  /***
   * Get All User
   */
  getAll() {
    const token = localStorage.getItem("token");
    const data = this.http.get<any>(`${URL_API}user/list`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
    return data;
  }
  getUserById(id: any) {
    const token = localStorage.getItem("token");
    const data = this.http.get<any>(`${URL_API}user/find/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
    return data;
  }

  /***
   * Facked User Register
   */
  register(user: any) {
    const token = localStorage.getItem("token");
    const data = this.http.post<any>(`${URL_API}user/save`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
    return data;
  }

  update(user: any) {
    const token = localStorage.getItem("token");
    const data = this.http.put<any>(`${URL_API}user/edit`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }),
    });
    return data;
  }

  getRoles() {
    const token = localStorage.getItem("token");
    const data = this.http.get<any>(
      `${URL_API}user/create
`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }),
      }
    );
    return data;
  }
}
