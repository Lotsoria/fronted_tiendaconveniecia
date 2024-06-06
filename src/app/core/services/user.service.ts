import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/auth.models";
import { GlobalComponent } from "../../global-component";

const AUTH_API = GlobalComponent.AUTH_API;

@Injectable({ providedIn: "root" })
export class UserProfileService {
  constructor(private http: HttpClient) {}
  /***
   * Get All User
   */
  getAll() {
    const token = localStorage.getItem("token");
    const data = this.http.get<any>(`${AUTH_API}user/list`, {
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
  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
