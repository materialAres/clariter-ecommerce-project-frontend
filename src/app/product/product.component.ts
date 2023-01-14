import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddedToCartToastService } from '../services/added-to-cart-toast.service';
import { CartService } from '../services/cart.service';
import { ProductListService } from '../services/product-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private productListService: ProductListService,
    public cartService: CartService,
    public addedToCartToastService: AddedToCartToastService) {}

  product: {
    id: number,
    name: string,
    price: number,
    qty: number,
    imageUrl: string
  } = {
    id: 0,
    name: '',
    price: 0,
    qty: 0,
    imageUrl: ''
  };

  subscription!: Subscription;

  ngOnInit(): void {

    setTimeout(() => {
      this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
        const id = +params.get('id')!;
        console.log("ID ", id);

        this.product = this.productListService.getProductById(id);
      })
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
