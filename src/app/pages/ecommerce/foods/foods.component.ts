import { Component, QueryList, ViewChildren } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal, NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
// Range Slider
import { Options } from "ngx-slider-v2";

// Sweet Alert
import Swal from "sweetalert2";

import { foodModel } from "./foods.model";
import { AdvancedService } from "./foods.service";
import {
  NgbdFoodsSortableHeader,
  foodSortEvent,
} from "./foods-sortable.directive";

// Foods Services
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from "../../../global-component";
import { Router } from "@angular/router";

@Component({
  selector: "app-foods",
  templateUrl: "./foods.component.html",
  styleUrls: ["./foods.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})
export class FoodsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  url = GlobalComponent.API_URL;
  content!: foodModel[];
  foods!: any;
  user = [];
  Brand: any = [];
  Rating: any = [];
  discountRates: number[] = [];
  contactsForm!: UntypedFormGroup;
  total: any;
  totalbrand: any;
  totalrate: any;
  totaldiscount: any;
  allfood: any;

  allfoods: any;
  activeindex = "1";
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
  foodList!: Observable<foodModel[]>;
  allfoodList!: Observable<foodModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdFoodsSortableHeader)
  headers!: QueryList<NgbdFoodsSortableHeader>;
  searchfoods: any;
  publishedfood: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public service: AdvancedService,
    private formBuilder: UntypedFormBuilder,
    public restApiService: restApiService,
  ) {
    this.foodList = service.countries$;
    this.allfoodList = service.allfood$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Foods", active: true },
    ];
    this.service.getFoods().subscribe((data) => {
      console.log("productos -> ", data);
      this.foods = data.list;
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
  //   this.foods = this.allfoods.slice(this.startIndex - 1, this.endIndex);
  // }

  /**
   * change navigation
   */
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.activeindex = "1";
      this.service.foodStatus = "";
    }
    if (changeEvent.nextId === 2) {
      this.activeindex = "2";
      this.service.foodStatus = "published";
    }
    if (changeEvent.nextId === 3) {
      this.activeindex = "3";
      this.service.foodStatus = "";
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: foodSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.foodsortable !== column) {
        header.direction = "";
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
        next: (data) => {},
        error: (err) => {
          this.content = JSON.parse(err.error).message;
        },
      });
      document.getElementById("p_" + id)?.remove();
    } else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById("p_" + item)?.remove();
      });
      (
        document.getElementById("selection-element") as HTMLElement
      ).style.display = "none";
    }
  }

  // Price Slider
  minValue = 0;
  maxValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  /**
   * Default Select2
   */
  multiDefaultOption = "Watches";
  selectedAccount = "This is a placeholder";
  Default = [{ name: "Watches" }, { name: "Headset" }, { name: "Sweatshirt" }];

  // Check Box Checked Value Get
  checkedValGet: any[] = [];
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkboxes: any = document.getElementsByName("checkAll");
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal;
    var checkBoxCount: any = document.getElementById(
      "select-content"
    ) as HTMLElement;
    checkBoxCount.innerHTML = checkedVal.length;
    checkedVal.length > 0
      ? ((
          document.getElementById("selection-element") as HTMLElement
        ).style.display = "block")
      : ((
          document.getElementById("selection-element") as HTMLElement
        ).style.display = "none");
  }
  /**
   * Brand Filter
   */
  changeBrand(e: any) {
    if (e.target.checked) {
      this.Brand.push(e.target.defaultValue);
    } else {
      for (var i = 0; i < this.Brand.length; i++) {
        if (this.Brand[i] === e.target.defaultValue) {
          this.Brand.splice(i, 1);
        }
      }
    }
    this.totalbrand = this.Brand.length;
  }

  /**
   * Discount Filter
   */
  changeDiscount(e: any) {
    if (e.target.checked) {
      this.discountRates.push(e.target.defaultValue);

      this.foodList.subscribe((x) => {
        this.foods = x.filter((food: any) => {
          return food.rating > e.target.defaultValue;
        });
      });
    } else {
      for (var i = 0; i < this.discountRates.length; i++) {
        if (this.discountRates[i] === e.target.defaultValue) {
          this.discountRates.splice(i, 1);
        }
      }
    }
    this.totaldiscount = this.discountRates.length;
  }

  /**
   * Rating Filter
   */
  changeRating(e: any, rate: any) {
    if (e.target.checked) {
      this.Rating.push(e.target.defaultValue);
      this.service.foodRate = rate;
    } else {
      for (var i = 0; i < this.Rating.length; i++) {
        if (this.Rating[i] === e.target.defaultValue) {
          this.Rating.splice(i, 1);
        }
      }
      this.service.foodRate = rate;
    }
    this.totalrate = this.Rating.length;
  }

  /**
   * Food Filtering
   */
  changeFoods(e: any, name: any, category: any) {
    const iconItems = document.querySelectorAll(".filter-list");
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll("a");
      el.forEach((item: any) => {
        var element = item.querySelector("h5").innerHTML;
        if (element == category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });

    this.service.FoodFilter = name;
  }

  /**
   * Search Food
   */
  search(value: string) {
    if (this.activeindex == "1") {
      if (value) {
        this.foods = this.allfoods.filter((val: any) =>
          val.category.toLowerCase().includes(value)
        );
        this.total = this.foods.length;
      } else {
        this.foods = this.searchfoods;
        this.total = this.allfoods.length;
      }
    } else if (this.activeindex == "2") {
      if (value) {
        this.publishedfood = this.publishedfood.filter((val: any) =>
          val.category.toLowerCase().includes(value)
        );
        this.total = this.publishedfood.length;
      } else {
        this.publishedfood = this.allpublish;
        this.total = this.publishedfood.length;
      }
    }
  }

  /**
   * Range Slider Wise Data Filter
   */
  valueChange(value: number, boundary: boolean): void {
    if (value > 0 && value < 1000) {
      if (this.activeindex == "1") {
        if (boundary) {
          this.minValue = value;
        } else {
          this.maxValue = value;
        }
      } else if (this.activeindex == "2") {
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
    var checkboxes: any = document.getElementsByName("checkAll");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    // this.service.searchTerm = ''
    this.totalbrand = 0;
    this.totaldiscount = 0;
    this.totalrate = 0;
    this.Brand = [];
    this.Rating = [];
    this.discountRates = [];
    const iconItems = document.querySelectorAll(".filter-list");
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll("a");
      el.forEach((item: any) => {
        item.classList.remove("active");
      });
    });
    this.service.searchTerm = "";
    this.service.FoodFilter = "";
    this.service.foodRate = 0;
    this.service.foodPrice = 0;
  }

  godetail(id: any) {
    this.router.navigate(["/ecommerce/food-detail/1", this.foods[id]]);
  }

  gopublishdetail(id: any) {
    this.router.navigate(["/ecommerce/food-detail/1", this.publishedfood[id]]);
  }
}
