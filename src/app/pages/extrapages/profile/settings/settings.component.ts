import { Component, OnInit } from "@angular/core";

import { TokenStorageService } from "../../../../core/services/token-storage.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

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

  changePassForm = this.formBuilder.group({
    newPass: new FormControl("", Validators.required),
    confirmPass: new FormControl("", Validators.required),
  });
  constructor(
    private TokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userData = this.TokenStorageService.getUser();
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
    console.log("nueva contraseña ->",this.changePassForm.value);
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
}
