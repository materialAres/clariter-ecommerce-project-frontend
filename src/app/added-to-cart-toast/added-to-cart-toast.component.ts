import { Component } from '@angular/core';

@Component({
  selector: 'app-added-to-cart-toast',
  templateUrl: './added-to-cart-toast.component.html',
  styleUrls: ['./added-to-cart-toast.component.css']
})
export class AddedToCartToastComponent {

  constructor() {}

  readonly header = 'Yeah!';
  readonly message = 'The item is in your cart';

}
