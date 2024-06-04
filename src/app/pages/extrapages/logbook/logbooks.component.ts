import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// Range Slider
import { Options } from 'ngx-slider-v2';

// Sweet Alert
import Swal from 'sweetalert2';

import { logbookModel } from './logbooks.model';
import { AdvancedService } from './logbooks.service';
import { NgbdlogbooksSortableHeader, logbookSortEvent } from './logbooks-sortable.directive';

// Logbooks Services
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from '../../../global-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logbooks',
  templateUrl: './logbooks.component.html',
  styleUrls: ['./logbooks.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Logbook Components
 */
export class LogbooksComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  url = GlobalComponent.API_URL;
  content!: logbookModel[];
  logbooks!: any;
  user = [];
  Brand: any = [];
  Rating: any = [];
  discountRates: number[] = [];
  contactsForm!: UntypedFormGroup;
  total: any;
  totalbrand: any;
  totalrate: any;
  totaldiscount: any;
  alllogbook: any;

  alllogbooks: any;
  activeindex = '1';
  allpublish: any;
  grocery: any = 0;
  fashion: any = 0;
  watches: any = 0;
  electronics: any = 0;
  furniture: any = 0;
  accessories: any = 0;
  appliance: any = 0;
  kids: any = 0;
  totalpublish: any = 0;

  // Table data
  logbookList!: Observable<logbookModel[]>;
  alllogbookList!: Observable<logbookModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdlogbooksSortableHeader) headers!: QueryList<NgbdlogbooksSortableHeader>;
  searchlogbooks: any;
  publishedlogbook: any;


  constructor(private modalService: NgbModal,
    private router: Router,
    public service: AdvancedService,
    private formBuilder: UntypedFormBuilder,
    public restApiService: restApiService) {
    this.logbookList = service.countries$;
    this.alllogbookList = service.alllogbook$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Logbook', active: true }
    ];


    /**
     * fetches data
     */
    setTimeout(() => {
      this.logbookList.subscribe(x => {
        this.content = this.logbooks;
        this.logbooks = Object.assign([], x);
      });

      this.alllogbookList.subscribe(x => {
        this.alllogbooks = Object.assign([], x);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    setTimeout(() => {
      for (var i = 0; i < this.alllogbooks.length; i++) {
        if (this.alllogbooks[i].category == 'Kitchen Storage & Containers') {
          this.grocery += 1
        }
        if (this.alllogbooks[i].category == 'Clothes') {
          this.fashion += 1
        }
        if (this.alllogbooks[i].category == 'Watches') {
          this.watches += 1
        } if (this.alllogbooks[i].category == 'Electronics') {
          this.electronics += 1
        } if (this.alllogbooks[i].category == 'Furniture') {
          this.furniture += 1
        } if (this.alllogbooks[i].category == 'Bike Accessories') {
          this.accessories += 1
        }
        if (this.alllogbooks[i].category == 'Tableware & Dinnerware') {
          this.appliance += 1
        }
        if (this.alllogbooks[i].category == 'Bags, Wallets and Luggage') {
          this.kids += 1
        }
        if (this.alllogbooks[i].status == 'published') {
          this.totalpublish += 1
        }
      }
    }, 2000);

    /**
   * Form Validation
   */
    this.contactsForm = this.formBuilder.group({
      subItem: this.formBuilder.array([]),
    });
  }

  /**
   * Pagination
   */
  // loadPage(page: number) {
  //   this.startIndex = (this.page - 1) * this.pageSize + 1;
  //   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
  //   if (this.endIndex > this.totalRecords) {
  //     this.endIndex = this.totalRecords;
  //   }
  //   this.logbooks = this.alllogbooks.slice(this.startIndex - 1, this.endIndex);
  // }

  /**
* change navigation
*/
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.activeindex = '1'
      this.service.logbookStatus = ''
    }
    if (changeEvent.nextId === 2) {
      this.activeindex = '2'
      this.service.logbookStatus = 'published'
    }
    if (changeEvent.nextId === 3) {
      this.activeindex = '3'
      this.service.logbookStatus = ''
    }
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: logbookSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.logbooksortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
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
    if (id) {
      this.restApiService.deleteData(id).subscribe({
        next: data => { },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
      document.getElementById('p_' + id)?.remove();
    }
    else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById('p_' + item)?.remove();
      });
      (document.getElementById("selection-element") as HTMLElement).style.display = "none"
    }
  }

  // Price Slider
  minValue = 0;
  maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000
  };

  /**
   * Default Select2
   */
  multiDefaultOption = 'Watches';
  selectedAccount = 'This is a placeholder';
  Default = [
    { name: 'Watches' },
    { name: 'Headset' },
    { name: 'Sweatshirt' },
  ];

  // Check Box Checked Value Get
  checkedValGet: any[] = [];
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    var checkBoxCount: any = document.getElementById('select-content') as HTMLElement;
    checkBoxCount.innerHTML = checkedVal.length;
    checkedVal.length > 0 ? (document.getElementById("selection-element") as HTMLElement).style.display = "block" : (document.getElementById("selection-element") as HTMLElement).style.display = "none";
  }
  /**
    * Brand Filter
    */
  changeBrand(e: any) {
    if (e.target.checked) {
      this.Brand.push(e.target.defaultValue)
    } else {
      for (var i = 0; i < this.Brand.length; i++) {
        if (this.Brand[i] === e.target.defaultValue) {
          this.Brand.splice(i, 1)
        }
      }
    }
    this.totalbrand = this.Brand.length
  }

  /**
  * Discount Filter
  */
  changeDiscount(e: any) {
    if (e.target.checked) {
      this.discountRates.push(e.target.defaultValue)

      this.logbookList.subscribe(x => {
        this.logbooks = x.filter((logbook: any) => {
          return logbook.rating > e.target.defaultValue;
        });
      });
    } else {
      for (var i = 0; i < this.discountRates.length; i++) {
        if (this.discountRates[i] === e.target.defaultValue) {
          this.discountRates.splice(i, 1)
        }
      }
    }
    this.totaldiscount = this.discountRates.length
  }


  /**
   * Rating Filter
   */
  changeRating(e: any, rate: any) {
    if (e.target.checked) {
      this.Rating.push(e.target.defaultValue)
      this.service.logbookRate = rate;
    }
    else {
      for (var i = 0; i < this.Rating.length; i++) {
        if (this.Rating[i] === e.target.defaultValue) {
          this.Rating.splice(i, 1)
        }
      }
      this.service.logbookRate = rate;
    }
    this.totalrate = this.Rating.length
  }



  /**
   * logbook Filtering  
   */
  changeLogbook(e: any, name: any, category: any) {
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('a')
      el.forEach((item: any) => {
        var element = item.querySelector('h5').innerHTML
        if (element == category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      })
    });

    this.service.LogbookFilter = name
  }


  /**
  * Search Logbook
  */
  search(value: string) {
    if (this.activeindex == '1') {
      if (value) {
        this.logbooks = this.alllogbooks.filter((val: any) =>
          val.category.toLowerCase().includes(value)
        );
        this.total = this.logbooks.length;
      } else {
        this.logbooks = this.searchlogbooks
        this.total = this.alllogbooks.length;
      }
    } else if (this.activeindex == '2') {
      if (value) {
        this.publishedlogbook = this.publishedlogbook.filter((val: any) =>
          val.category.toLowerCase().includes(value)
        );
        this.total = this.publishedlogbook.length;
      } else {
        this.publishedlogbook = this.allpublish
        this.total = this.publishedlogbook.length;
      }
    }

  }

  /**
  * Range Slider Wise Data Filter
  */
  valueChange(value: number, boundary: boolean): void {
    if (value > 0 && value < 1000) {
      if (this.activeindex == '1') {
        if (boundary) {
          this.minValue = value;
        } else {
          this.maxValue = value;
        }
      } else if (this.activeindex == '2') {
        if (boundary) {
          this.minValue = value;
        } else {
          this.maxValue = value;
        }
      }
    }
  }

  clearall(ev: any) {
    this.minValue = 0;
    this.maxValue = 1000;
    var checkboxes: any = document.getElementsByName('checkAll');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
    // this.service.searchTerm = ''
    this.totalbrand = 0;
    this.totaldiscount = 0;
    this.totalrate = 0;
    this.Brand = []
    this.Rating = []
    this.discountRates = []
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('a')
      el.forEach((item: any) => {
        item.classList.remove("active");
      })
    });
    this.service.searchTerm = '';
    this.service.LogbookFilter = '';
    this.service.logbookRate = 0;
    this.service.logbookPrice = 0;
  }

  godetail(id: any) {
    this.router.navigate(['/ecommerce/logbook-detail/1', this.logbooks[id]])
  }

  gopublishdetail(id: any) {
    this.router.navigate(['/ecommerce/logbook-detail/1', this.publishedlogbook[id]])
  }

}
