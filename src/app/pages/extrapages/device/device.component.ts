import { Component, OnInit, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { NgbModal, NgbOffcanvas  } from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { deviceModel } from './device.model';
import { Device } from './data';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

/**
 * Device Component
 */
export class DeviceComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  Device!: deviceModel[];
  submitted = false;
  deviceForm!: FormGroup;
  term:any;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Device', active: true }
    ];

    /**
     * Form Validation
     */
     this.deviceForm = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      jobPosition: ['', [Validators.required]],
      projectCount: ['', [Validators.required]],
      taskCount: ['', [Validators.required]]
    });

     // Chat Data Get Function
     this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.Device = Device;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
     this.submitted = false;
     this.deviceForm = this.formBuilder.group({
      _id: [''],
      name: [''],
      jobPosition: [''],
      projectCount: [''],
      taskCount: ['']
    });
    this.modalService.open(content, { size: 'md', centered: true });
  }

   /**
   * Form data get
   */
    get form() {
      return this.deviceForm.controls;
    }

  /**
  * Save device
  */
   saveDevice() {
     if (this.deviceForm.valid) {
       if (this.deviceForm.get('_id')?.value) {
         this.Device = Device.map((order: { id: any; }) => order.id === this.deviceForm.get('_id')?.value ? { ...order, ...this.deviceForm.value } : order);
         this.modalService.dismissAll();
       } else {
         const id = '10';
         const backgroundImg = 'assets/images/small/img-6.jpg';
         const userImage = null;
         const name = this.deviceForm.get('name')?.value;
         const jobPosition = this.deviceForm.get('jobPosition')?.value;
         const projectCount = this.deviceForm.get('projectCount')?.value;
         const taskCount = this.deviceForm.get('taskCount')?.value;
         this.Device.push({
           id,
           backgroundImg,
           userImage,
           name,
           jobPosition,
           projectCount,
           taskCount
         });
         this.modalService.dismissAll()
       }
       this.submitted = true
     }
   }
  
      // Edit Data
      EditData(content: any, id: any) {
        this.submitted = false;
        this.modalService.open(content, { size: 'md', centered: true });
        var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
        modelTitle.innerHTML = 'Edit Members';
        var updateBtn = document.getElementById('addNewMember') as HTMLAreaElement;
        updateBtn.innerHTML = "Update";
        let econtent = this.Device[id];
        this.deviceForm.controls['name'].setValue(econtent.name);
        this.deviceForm.controls['jobPosition'].setValue(econtent.jobPosition);
        this.deviceForm.controls['projectCount'].setValue(econtent.projectCount);
        this.deviceForm.controls['taskCount'].setValue(econtent.taskCount);
        this.deviceForm.controls['_id'].setValue(econtent.id);
        var coverimg: any = document.getElementById('cover-img');
        coverimg.src = econtent.backgroundImg
  
        var img: any = document.getElementById('member-img');
        if (econtent.userImage) {
          img.src = econtent.userImage
        } else {
          (document.getElementById("member-img") as HTMLElement).style.display = "block"
        }
      }

  /**
   * Active Toggle navbar
   */
   activeMenu(id:any) {            
    document.querySelector('.star_'+id)?.classList.toggle('active');
  }

  /**
  * Delete Model Open
  */
   deleteId: any;
   confirm(content: any,id:any) {
     this.deleteId = id;
     this.modalService.open(content, { centered: true });
   }

   // Delete Data
   deleteData(id:any) { 
    document.getElementById('t_'+id)?.remove();
  }

  // View Data Get
  viewDataGet(id:any){
    var deviceData = this.Device.filter((device:any) => {     
      return device.id === id;
    });
    var profile_img = deviceData[0].userImage ? 
      `<img src="`+deviceData[0].userImage+`" alt="" class="avatar-lg img-thumbnail rounded-circle mx-auto">`:
      `<div class="avatar-lg img-thumbnail rounded-circle flex-shrink-0 mx-auto fs-20">
        <div class="avatar-title bg-danger-subtle text-danger rounded-circle">`+deviceData[0].name[0]+`</div>
      </div>`
    var img_data = (document.querySelector('.profile-offcanvas .device-cover img') as HTMLImageElement);
    img_data.src = deviceData[0].backgroundImg;
    var profile = (document.querySelector('.profileImg') as HTMLImageElement);
    profile.innerHTML = profile_img;
    (document.querySelector('.profile-offcanvas .p-3 .mt-3 h5') as HTMLImageElement).innerHTML = deviceData[0].name;
    (document.querySelector('.profile-offcanvas .p-3 .mt-3 p') as HTMLImageElement).innerHTML = deviceData[0].jobPosition;
    (document.querySelector('.project_count') as HTMLImageElement).innerHTML = deviceData[0].projectCount;
    (document.querySelector('.task_count') as HTMLImageElement).innerHTML = deviceData[0].taskCount;
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event:any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')
    this.deviceForm.patchValue({
      // image_src: file.name
      image_src: 'avatar-8.jpg'
    }); 
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('member-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }

  // File Upload
  bgimageURL: string | undefined;
  bgfileChange(event:any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')
    this.deviceForm.patchValue({
      // image_src: file.name
      image_src: 'avatar-8.jpg'
    }); 
    const reader = new FileReader();
    reader.onload = () => {
      this.bgimageURL = reader.result as string;
      (document.getElementById('cover-img') as HTMLImageElement).src = this.bgimageURL;
    }
    reader.readAsDataURL(file)
  }

}
