import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { GlobalComponent } from "../../global-component";
import { User } from "../models/auth.models";
import { getFirebaseBackend } from "src/app/authUtils";

const AUTH_API = GlobalComponent.AUTH_API;

@Injectable({ providedIn: "root" })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  user!: User;
  currentUserValue: any;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, first_name: string, password: string) {
    return this.http.post(
      AUTH_API + "signup",
      {
        email,
        first_name,
        password,
      },
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
    );
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(code: string, password: string, identifier: string) {
    console.log(code, password, identifier);
    return this.http
      .post<HttpResponse<any>>(
        AUTH_API + "/security/sign_in",
        {
          code,
          password,
          identifier,
        },
        {
          observe: "response", // Asegúrate de observar la respuesta completa
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          localStorage.setItem('token', response.headers.get("Authorization")!);

          const authToken = response.headers.get("Authorization");
          console.log("Auth Token:", authToken);
          return { ...response.body, authToken };
        })
      );
  }

  /**
   * Returns the current user
   */
  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null!);
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
}
