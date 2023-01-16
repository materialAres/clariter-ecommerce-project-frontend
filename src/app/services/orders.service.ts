import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    public httpClient: HttpClient,
    public cartService: CartService,
    public customerService: CustomerService
    ) {}

  private orders: {
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
      customer: this.customerService.getCustomer(),
      amount: 0,
      products: this.cartService.getCart()
    }).subscribe(res => {
      this.loadOrdersByClientId(this.customerService.getCustomer().id);
      this.cartService.resetCart();
    })
  }
}
