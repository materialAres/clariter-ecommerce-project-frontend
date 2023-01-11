import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ProductListService } from 'src/services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // la variabile http sarà disponibile in tutta la classe
  constructor(
    public productListService: ProductListService,
    public cartService: CartService
  ) {}

  products: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
   }[] = [];

  show = false;

  showToast() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.products = this.productListService.getProducts();

    setInterval(() => {
      this.products = this.productListService.getProducts();
    }, 32000);
  }

}
