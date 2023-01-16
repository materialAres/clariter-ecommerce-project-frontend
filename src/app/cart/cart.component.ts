import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    public cartService: CartService,
    public ordersService: OrdersService,
    private modalService: NgbModal
    ) {}

  protected id = 0;

  saveId(id: number) {
    this.id = id;
  }

  openAlert() {
    const options: NgbModalOptions = {
      size: 'sm' // set the size of the modal window
    };
    this.modalService.open(this.modalContent, options); // open the modal window with the modalContent template
    this.ordersService.createOrder();
  }

}
