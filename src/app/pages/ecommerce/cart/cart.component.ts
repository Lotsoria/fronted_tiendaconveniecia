import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  cartData: any[] = [];
  deleteId: any;
  dataCount: any;
  totalAmount: number = 0;
  selectedPaymentMethod: string = 'cash';

  constructor(
    private modalService: NgbModal,
    private productoService: CartService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Shopping Cart", active: true },
    ];

    // Consumir el endpoint para obtener los productos
    this.productoService.getProducts().subscribe((data: any) => {
      this.cartData = [...data.products, ...data.foods].map((item: any) => {
        return {
          ...item,
          units: 1, // Asignar unidades iniciales
          total: item.price * 1,
        };
      });
      this.dataCount = this.cartData.length;
      this.calculateTotal();
    }, error => {
      console.error('Error fetching products', error);
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

  saveSale(paymentData: any) {
    const items = this.cartData
      .filter(item => item.units > 0) // Filtrar productos con unidades > 0
      .map(item => ({
        itemId: item.id,
        quantity: item.units,
        price: item.price,
      }));

    const requestBody = {
      nit: "66186692",
      totalAmount: this.totalAmount,
      items: items,
      ...paymentData,
    };

    this.productoService.saveSale(requestBody).subscribe((response: any) => {
      if (response.success) {
        alert("Venta realizada con éxito.");
        this.clearCart(); // Llamar a la función para limpiar el carrito
      } else {
        alert("Error al realizar la venta.");
      }
    });
  }

  handlePayment() {
    let paymentData: any = {};

    if (this.selectedPaymentMethod === 'cash') {
      paymentData = { cashAmount: this.totalAmount, cardAmount: null, cardNumber: null, transferAmount: null, transferAuthorization: null, transferBank: null };
    } else if (this.selectedPaymentMethod === 'card') {
      // Aquí puedes agregar lógica para recolectar los datos de la tarjeta
      paymentData = { cashAmount: null, cardAmount: this.totalAmount, cardNumber: '1234567890', transferAmount: null, transferAuthorization: null, transferBank: null };
    } else if (this.selectedPaymentMethod === 'transfer') {
      // Aquí puedes agregar lógica para recolectar los datos de la transferencia
      paymentData = { cashAmount: null, cardAmount: null, cardNumber: null, transferAmount: this.totalAmount, transferAuthorization: 'auth123', transferBank: 'Banrural' };
    }

    this.saveSale(paymentData);
  }

   // Nueva función para limpiar el carrito
   clearCart() {
    this.cartData.forEach(item => {
      item.units = 0;
      item.total = 0;
    });
    this.calculateTotal();
  }
}
