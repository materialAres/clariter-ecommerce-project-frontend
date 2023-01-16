import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { AddedToCartToastService } from '../services/added-to-cart-toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  constructor(
    public productListService: ProductListService,
    public cartService: CartService,
    public addedToCartToastService: AddedToCartToastService
  ) {}

}
