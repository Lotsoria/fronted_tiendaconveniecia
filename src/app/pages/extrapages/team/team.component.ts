import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  TemplateRef,
} from "@angular/core";
import { NgbModal, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { teamModel } from "./team.model";
import { Team } from "./data";
import { UserProfileService } from "src/app/core/services/user.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})

/**
 * Team Component
 */
export class TeamComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  Team!: any[];
  datauser: any;
  submitted = false;
  teamForm!: FormGroup;
  term: any;
  message: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Pages" },
      { label: "Team", active: true },
    ];

    /**
     * Form Validation
     */
    this.teamForm = this.formBuilder.group({
      _id: [""],
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      rolId: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
    this.userService.getAll().subscribe((data) => {
      this.Team = data.list.map((user: any) => ({
        id: user.id,
        name: user.name,
        jobPosition: user.rol,
      }));
    });

    // Chat Data Get Function
    // this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    // this.userService.getAll().subscribe((data) => {
    //   console.log("datos del usuario", data);
    // });

    this.Team = Team;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.teamForm = this.formBuilder.group({
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
      rolId: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
    this.modalService.open(content, { size: "md", centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.teamForm.controls;
  }

  /**
   * Save Team
   */
  saveTeam() {
    if (this.teamForm.valid) {
      if (this.teamForm.value.password != this.teamForm.value.confirmPassword) {
        this.message = "Las contraseñas no coinciden";
        console.log("las contraseñas no coinciden");
        return;
      }
      const newUserData = {
        code: this.teamForm.value.code,
        name: this.teamForm.value.name,
        rolId: this.teamForm.value.rolId,
        password: this.teamForm.value.password,
      };
      
      this.userService.register(newUserData).subscribe({
        next: (data) => {
          this.message = "Usuario creado correctamente";
        },
        complete: () => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          this.message = "Error al crear usuario";
        }
      });

    }
  }

  // Edit Data
  EditData(content: any, id: any) {
    this.submitted = false;
    this.modalService.open(content, { size: "md", centered: true });
    var modelTitle = document.querySelector(".modal-title") as HTMLAreaElement;
    modelTitle.innerHTML = "Edit Members";
    var updateBtn = document.getElementById("addNewMember") as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    let econtent = this.Team[id];
    this.teamForm.controls["name"].setValue(econtent.name);
    this.teamForm.controls["jobPosition"].setValue(econtent.jobPosition);
    this.teamForm.controls["projectCount"].setValue(econtent.projectCount);
    this.teamForm.controls["taskCount"].setValue(econtent.taskCount);
    this.teamForm.controls["_id"].setValue(econtent.id);
    var coverimg: any = document.getElementById("cover-img");
    coverimg.src = econtent.backgroundImg;

    var img: any = document.getElementById("member-img");
    if (econtent.userImage) {
      img.src = econtent.userImage;
    } else {
      (document.getElementById("member-img") as HTMLElement).style.display =
        "block";
    }
  }

  /**
   * Active Toggle navbar
   */
  activeMenu(id: any) {
    document.querySelector(".star_" + id)?.classList.toggle("active");
  }

  /**
   * Delete Model Open
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    document.getElementById("t_" + id)?.remove();
  }

  // View Data Get
  viewDataGet(id: any) {
    var teamData = this.Team.filter((team: any) => {
      return team.id === id;
    });
    var profile_img = teamData[0].userImage
      ? `<img src="` +
        teamData[0].userImage +
        `" alt="" class="avatar-lg img-thumbnail rounded-circle mx-auto">`
      : `<div class="avatar-lg img-thumbnail rounded-circle flex-shrink-0 mx-auto fs-20">
        <div class="avatar-title bg-danger-subtle text-danger rounded-circle">` +
        teamData[0].name[0] +
        `</div>
      </div>`;
    var img_data = document.querySelector(
      ".profile-offcanvas .team-cover img"
    ) as HTMLImageElement;
    // img_data.src = teamData[0].backgroundImg;
    var profile = document.querySelector(".profileImg") as HTMLImageElement;
    profile.innerHTML = profile_img;
    (
      document.querySelector(
        ".profile-offcanvas .p-3 .mt-3 h5"
      ) as HTMLImageElement
    ).innerHTML = teamData[0].name;
    (
      document.querySelector(
        ".profile-offcanvas .p-3 .mt-3 p"
      ) as HTMLImageElement
    ).innerHTML = teamData[0].jobPosition;
    (document.querySelector(".project_count") as HTMLImageElement).innerHTML =
      teamData[0].projectCount;
    (document.querySelector(".task_count") as HTMLImageElement).innerHTML =
      teamData[0].taskCount;
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: "end" });
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    document.getElementById("");
    this.teamForm.patchValue({
      // image_src: file.name
      image_src: "avatar-8.jpg",
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById("member-img") as HTMLImageElement).src =
        this.imageURL;
    };
    reader.readAsDataURL(file);
  }

  // File Upload
  bgimageURL: string | undefined;
  bgfileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    document.getElementById("");
    this.teamForm.patchValue({
      // image_src: file.name
      image_src: "avatar-8.jpg",
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.bgimageURL = reader.result as string;
      (document.getElementById("cover-img") as HTMLImageElement).src =
        this.bgimageURL;
    };
    reader.readAsDataURL(file);
  }
}
