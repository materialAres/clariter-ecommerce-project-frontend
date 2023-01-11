import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { CartService } from './cart.service';
import { CustomerService } from './customer.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit {
  constructor(
    public httpClient: HttpClient,
    public cartService: CartService,
    public customerService: CustomerService,
    public menuService: MenuService
    ) {}

  ngOnInit(): void {
    this.loadOrdersByClientId(this.customerService.customerId);
  }

  public orders: {
    id: number,
    products: any,
    amount: number,
    customer: any,
    createdAt: Date
  }[] = [];

  loadOrdersByClientId(id: number) {
    this.orders = [];

    this.httpClient.get(`http://localhost:8080/order/by-client-id/${id}`).subscribe((response) => {

      Object.entries(response).forEach(([key, value]) => {
        this.orders.push(value);
      })

    })
    console.log(this.orders);

    return this.orders;
  }

  getOrders() {
    return this.orders;
  }

  setOrders(orders: any) {
    this.orders = orders;
  }

  createOrder() {
    this.httpClient.post('http://localhost:8080/order/add', {
      id: 0,
      customer: this.customerService.customer,
      amount: 0,
      products: this.cartService.getCart()
    }).subscribe(res => {
      this.loadOrdersByClientId(this.customerService.customer.id);
      this.cartService.resetCart();
    })
  }
}
