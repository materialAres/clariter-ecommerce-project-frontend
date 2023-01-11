import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { AddedToCartToastService } from '../services/added-to-cart-toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // la variabile http sarà disponibile in tutta la classe
  constructor(
    public productListService: ProductListService,
    public cartService: CartService,
    public addedToCartToastService: AddedToCartToastService
  ) {}

  products: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
   }[] = [];

  ngOnInit(): void {
    this.products = this.productListService.getProducts();

    setInterval(() => {
      this.products = this.productListService.getProducts();
    }, 32000);
  }

}
