import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { CustomerService } from 'src/services/customer.service';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  constructor(public ordersService: OrdersService, public cartService: CartService) {}

}
