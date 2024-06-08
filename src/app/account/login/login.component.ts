import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

// Login Auth
import { AuthenticationService } from "../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../core/services/authfake.service";
import { ToastService } from "./toast-service";
import { Code } from "angular-feather/icons";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private authFackservice: AuthfakeauthenticationService,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("currentUser")) {
      this.router.navigate(["/"]);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      code: ["abc123", [Validators.required]],
      identifier: ["64dvV9pCmIXjdlr", [Validators.required]],
      password: ["qwerty", [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // Login Api
    //  this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data:any) => {
    //   if(data.status == 'success'){
    //     localStorage.setItem('toast', 'true');
    //     localStorage.setItem('currentUser', JSON.stringify(data.data));
    //     localStorage.setItem('token', data.token);
    //     this.router.navigate(['/']);
    //   } else {
    //     this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
    //   }
    // });

    this.authenticationService
      .login(this.f["code"].value, this.f["password"].value, "64dvV9pCmIXjdlr")
      .subscribe((data: any) => {
        if (data.success == true) {
          const currentUser = {
            first_name: data.name,
            name: data.name,
            restriction: data.restriction,
            role: data.restriction,
            code: data.code,
          };
          localStorage.setItem("toast", "true");
          localStorage.setItem("rol", data.restriction);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          this.router.navigate(["/"]);
        } else {
          this.toastService.show(data.data, {
            classname: "bg-danger text-white",
            delay: 15000,
          });
        }
      });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
