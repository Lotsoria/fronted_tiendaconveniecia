import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersDetailsComponent } from "./orders-details/orders-details.component";
import { CustomersComponent } from "./customers/customers.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { SellersComponent } from "./sellers/sellers.component";
import { SellerDetailsComponent } from "./seller-details/seller-details.component";
import { AuthGuardCashierAdmin } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuardCashierAdmin],
  },
  {
    path: "product-detail/:id",
    component: ProductDetailComponent,
    canActivate: [AuthGuardCashierAdmin],
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "order-details",
    component: OrdersDetailsComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuardCashierAdmin],
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [AuthGuardCashierAdmin],
  },
  {
    path: "sellers",
    component: SellersComponent
  },
  {
    path: "seller-details",
    component: SellerDetailsComponent
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
