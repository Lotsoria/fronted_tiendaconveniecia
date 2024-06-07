import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})

/**
 * Cart Component
 */
export class CartComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  cartData!: any[];
  deleteId: any;
  dataCount: any;
  totalAmount: number = 0;

  constructor(
    private modalService: NgbModal,
    private productoService: CartService
  ) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Shopping Cart", active: true },
    ];
    this.productoService.getProduct().subscribe((data) => {
      this.cartData = data.list.map((item: any) => {
        return {
          ...item,
          total: item.price * item.units,
        };
      });
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartData.reduce((sum, item) => sum + item.total, 0);
    (document.getElementById("cart-subtotal") as HTMLElement).innerText = this.totalAmount.toFixed(2);
    (document.getElementById("cart-total") as HTMLElement).innerText = this.totalAmount.toFixed(2);
  }

  increment(event: any, id: any) {
    const item = this.cartData.find(x => x.id === id);
    if (item) {
      item.units++;
      item.total = item.price * item.units;
      this.calculateTotal();
    }
  }

  decrement(event: any, id: any) {
    const item = this.cartData.find(x => x.id === id);
    if (item && item.units > 0) {
      item.units--;
      item.total = item.price * item.units;
      this.calculateTotal();
    }
  }

  updateQuantity(subTotal: any) {
    // Actualización adicional si es necesario
  }

  confirm(event: any, content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteData(event: any, content: any, id: any) {
    this.cartData = this.cartData.filter(x => x.id !== id);
    this.calculateTotal();
    document.getElementById("cart-id" + id)?.remove();
    this.dataCount = this.cartData.length;
  }
}
