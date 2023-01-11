import { Component } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { CustomerService } from 'src/services/customer.service';
import { MenuService } from 'src/services/menu.service';
import { OrdersService } from 'src/services/orders.service';
import { ProductListService } from 'src/services/product-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    public customerService: CustomerService,
    public menuService: MenuService,
    public ordersService: OrdersService,
    public cartService: CartService,
    public productListService: ProductListService
    ) {
    this.customers = this.customerService.getCustomers();
    console.log(this.customers);
  }

  title: string = 'Rickrolling Shop';

  customers: {
    id: number,
    name: string,
    surname: string
  }[] = [];

  customer: {
    id: number,
    name: string,
    surname: string
  } = {
    id: 0,
    name: '',
    surname: ''
  };

  links = [
    {name: 'Products', href: '/products', disabled: false},
    {name: 'Orders', href: '/orders', disabled: false},
    {name: 'Cart', href: '/cart', disabled: true},
  ];

  hoveredOption: number | null = null;

  onCustomerChange(event: Event) {
    this.customerService.setCustomerId(Number((<HTMLInputElement> event.target).value));
    this.ordersService.loadOrdersByClientId(this.customerService.customerId);
    this.cartService.resetCart();

    this.productListService.disableButton(Number((<HTMLInputElement> event.target).value));

    this.storeCustomer(Number((<HTMLInputElement> event.target).value));
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
}
