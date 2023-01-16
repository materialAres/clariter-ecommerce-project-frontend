import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    public customerService: CustomerService,
    public ordersService: OrdersService,
    public cartService: CartService,
    public productListService: ProductListService
    ) {
    this.customers = this.customerService.getCustomers();
  }

  readonly title = 'Rickrolling Shop';

  private customers: {
    id: number,
    name: string,
    surname: string
  }[] = [];

  readonly links: {
    name: string,
    href: string,
    disabled: boolean
  }[] = [
    {name: 'Products', href: '/products', disabled: false},
    {name: 'Orders', href: '/orders', disabled: false},
    {name: 'Cart', href: '/cart', disabled: true},
  ];

  /** When we change the customer from the dropdown menu its id is taken to */
  onCustomerChange(event: Event) {
    this.customerService.setCustomerId(Number((<HTMLInputElement> event.target).value));

    this.ordersService.loadOrdersByClientId(this.customerService.getCustomerId());
    this.cartService.resetCart();
    this.productListService.disableButton(this.customerService.getCustomerId());

    this.storeCustomer(this.customerService.getCustomerId());
  }

  storeCustomer(id: number) {
    if (this.customers.length == 0) {
      throw new Error("List empty");
    }

    for (let customer of this.customers) {
      if (customer.id == id) {
        this.customerService.setCustomer(customer);
        return customer;
      }
    }

    throw new Error("CUSTOMER NOT FOUND");
  }

  changeCartBadgeHiddenProperty() {
    if (this.cartService.getCart().length == 0) {
      return true;
    } else {
      return false;
    }
  }

  getCustomers() {
    return this.customers;
  }
}
