import { Component, OnInit } from "@angular/core";

import { TokenStorageService } from "../../../../core/services/token-storage.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserProfileService } from "src/app/core/services/user.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})

/**
 * Profile Settings Component
 */
export class SettingsComponent implements OnInit {
  userData: any;
  id: string | null = null;
  dataForm!: FormGroup;
  message: any;
  roles: any = [];
  changePassForm = this.formBuilder.group({
    newPass: new FormControl("", Validators.required),
    confirmPass: new FormControl("", Validators.required),
  });
  constructor(
    private TokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userData = this.TokenStorageService.getUser();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.userService.getRoles().subscribe((data) => {
        this.roles = data.roles;
        console.log("roles ->", this.roles);
      });
      this.userService.getUserById(this.id).subscribe((data) => {
        console.log("user data ->", data);
        const mapData = {
          id: this.id,
          code: data.user.code,
          name: data.user.name,
          rol:
            data.user.rolId == 1
              ? data.roles[0].value
              : data.user.rolId == 2
              ? data.roles[1].value
              : data.roles[2].value,
          status: data.user.status == true ? "Activo" : "Inactivo",
        };
        this.userData = mapData;
      });
    }

    this.dataForm = this.formBuilder.group({
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      rol: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
  }

  /**
   * Multiple Default Select2
   */
  selectValue = [
    "Illustrator",
    "Photoshop",
    "CSS",
    "HTML",
    "Javascript",
    "Python",
    "PHP",
  ];
  // File Upload
  imageURL: string | undefined;

  changePass() {
    console.log("nueva contraseña ->", this.changePassForm.value);
  }

  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    document.getElementById("");

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById("product-img") as HTMLImageElement).src =
        this.imageURL;
    };
    reader.readAsDataURL(file);
  }
  updateData() {
    if (this.dataForm.value.rol == "") {
      this.dataForm.value.rol = this.userData.rol;
    }
    if (this.dataForm.value.status == "") {
      this.dataForm.value.status = this.userData.status;
    }

    this.message = "";
    const dataUpdate = {
      id: this.id,
      code: this.dataForm.value.code
        ? this.dataForm.value.code
        : this.userData.code,
      name: this.dataForm.value.name
        ? this.dataForm.value.name
        : this.userData.name,
      status: this.dataForm.value.status
        ? this.dataForm.value.status
        : this.userData.status,
      rolId: this.dataForm.value.rol
        ? this.dataForm.value.rol
        : this.userData.rol,
    };
    console.log("dataUpdate ->", dataUpdate);
    this.userService.update(dataUpdate).subscribe((data) => {
      this.message = data.message;
      console.log("data ->", data);
    });
  }
}
