import { Component,  OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { OrdersService } from 'src/services/orders.service';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    public cartService: CartService,
    public ordersService: OrdersService,
    private modalService: NgbModal
    ) {}

  id: number = 0;

  saveId(id: number) {
    this.id = id;
  }

  ngOnInit(): void {}

  openAlert() {
    const options: NgbModalOptions = {
      size: 'sm' // set the size of the modal window
    };
    this.modalService.open(this.modalContent, options); // open the modal window with the modalContent template
    this.ordersService.createOrder();
  }

}
