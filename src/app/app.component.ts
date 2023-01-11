import { Component, EventEmitter, Output, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }

  title = 'E-commerce';

  btnIsDisabled: boolean = true;

  fromParent = 'Share with child';

  customerId: number = 0;

  customer: {
    id: number,
    name: string,
    surname: string
  } = {
    id: 0,
    name: '',
    surname: ''
  };

  /* changeCustomerObject(customer: {
    id: number,
    name: string,
    surname: string
  }) {
    console.log(customer);

    if (customer.id != this.customer.id) {
      // reset del carrello
      this.cart = [];
    }

    if (customer.id == 0) {
      this.btnIsDisabled = true;
    } else {
      this.btnIsDisabled = false;
    }

    this.customer = customer; */
  //}
}
