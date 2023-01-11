import { Component } from '@angular/core';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-added-to-cart-toast',
  templateUrl: './added-to-cart-toast.component.html',
  styleUrls: ['./added-to-cart-toast.component.css']
})
export class AddedToCartToastComponent {

  constructor() {}

  header = 'Yeah!';
  message = 'The item is in your cart';

}
